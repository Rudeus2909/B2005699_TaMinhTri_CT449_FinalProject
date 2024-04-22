const { ObjectId } = require("mongodb");

class AuthService {
    constructor(client) {
        this.auth = client.db().collection("users");
    }

    //Tìm người dùng theo id
    async findById(id) {
        return await this.auth.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    //Đăng ký
    async register(name, phone, birthdate, gender, address, password) {
        try {
            // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
            const existingUser = await this.auth.findOne({ phone: phone });
            if (existingUser) {
                throw new Error("User already exists");
            }

            // Tạo một đối tượng user mới để thêm vào cơ sở dữ liệu
            const user = {
                name: name,
                phone: phone,
                birthdate: birthdate,
                gender: gender,
                address: address,
                password: password,
                role: "user",
            };

            // Thêm người dùng mới vào cơ sở dữ liệu
            const result = await this.auth.insertOne(user);
            return result.insertedId;
        } catch (error) {
            throw new Error(`Failed to register user: ${error.message}`);
        }
    }

    //Đăng nhập
    async login(phone, password) {
        try {
            const user = await this.auth.findOne({ phone: phone, password: password });
            return user;
        } catch (error) {
            throw new Error(`Failed to login: ${error.message}`);
        }
    }
    
}

module.exports = AuthService;