const { ObjectId } = require("mongodb");

class BorrowBookService {
    constructor(client) {
        this.borrowBook = client.db().collection("borrow_book");
    }

    createIndex() {
        this.borrowBook.createIndex(
            { "id_user": 1, "id_book": 1, "borrowed_day": 1 },
            { unique: true }
        );
    }

    extractConactData(payload) {
        const borrowBook = {
            id_user: payload.id_user,
            id_book: payload.id_book,
            borrowed_day: payload.borrowed_day,
            return_day: payload.return_day,
        };
        Object.keys(borrowBook).forEach(
            (key) => borrowBook[key] === undefined && delete borrowBook[key]
        );
        return borrowBook;
    }

    //
    async find(filter) {
        const cursor = await this.borrowBook.find(filter);
        return await cursor.toArray();
    }

    ///Tìm theo id_user
    async findByIdUser(id_user) {
        return await this.find({
            id_user: { $regex: new RegExp(id_user), $options: "i"},
        });
    }

    ///Tìm theo id_book
    async findByIdBook(id_book) {
        return await this.find({
            id_book: { $regex: new RegExp(id_book), $options: "i"},
        });
    }

    //Mượn sách
    async borrowingBook(payload) {
        const borrowBook = this.extractConactData(payload);
        const result = await this.borrowBook.findOneAndUpdate(
            borrowBook,
            { $set: borrowBook },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    //Trả sách
    async returnBook({idUser, idBook}, payload) {
        const borrowInfo = await this.borrowBook.findOne({
            id_user: idUser,
            id_book: idBook,
            return_day: "",
        });
        const update = this.extractConactData(payload);
        const result = await this.borrowBook.findOneAndUpdate(
            { _id: borrowInfo._id },
            { $set: update },
            { returnDocument: "after" }
        );
        console.log(result);
        return result;
    }
}

module.exports = BorrowBookService;