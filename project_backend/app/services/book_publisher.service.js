const { ObjectId } = require("mongodb");

class BookPublisherService {
    constructor(client) {
        this.publisher = client.db().collection("book_publisher");
    }

    extractConactData(payload) {
        const publisher = {
            name: payload.name,
            address: payload.address,
        };
        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    //Tìm NXB
    async find(filter) {
        const cursor = await this.publisher.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    //Tìm NXB theo id
    async findById(id) {
        return await this.publisher.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    //Tạo nhà xuất bản mới
    async createPublisher(payload) {
        const publisher = this.extractConactData(payload);
        const result = await this.publisher.findOneAndUpdate(
            publisher,
            { $set: publisher },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    //Chỉnh sửa NXB
    async updatePublisher(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.publisher.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
    
    //Xóa NXB
    async deletePublisher(id) {
        const result = await this.publisher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = BookPublisherService;