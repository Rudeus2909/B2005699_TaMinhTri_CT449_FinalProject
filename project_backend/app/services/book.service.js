const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.book = client.db().collection("books");
    }

    //Tìm tất cả sách
    async find(filter) {
        const cursor = await this.book.find(filter);
        return await cursor.toArray();
    }

    //Tìm sách theo tên
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    //Tìm sách theo id
    async findById(id) {
        return await this.book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    
    extractConactData(payload) {
        const book = {
            name: payload.name,
            price: payload.price,
            quantity: payload.quantity,
            publishing_year: payload.publishing_year,
            id_publisher: payload.id_publisher,
        };
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    //Thêm sách
    async createBook(payload) {
        const book = this.extractConactData(payload);
        const result = await this.book.findOneAndUpdate(
            book,
            { $set: book },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    //Chỉnh sửa sách
    async updateBook(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    //Xóa sách
    async deleteBook(id) {
        const result = await this.book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = BookService;