const BookService = require("../services/book.service");
const AuthService = require("../services/auth.service");
const BookPublisherService = require("../services/book_publisher.service");
const BorrowBookService = require("../services/borrow_book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Hiển thị dach sách mượn sách
exports.findAllBorrowBook = async (req, res, next) => {
    let documents = [];
    try {
        const borrowBookService = new BorrowBookService(MongoDB.client);
        documents = await borrowBookService.find({});
        const bookService = new BookService(MongoDB.client);
        const authService = new AuthService(MongoDB.client);
        for (const doc of documents) {
            const bookId = doc.id_book;
            const bookInfo = await bookService.findById(bookId);
            doc.bookInfo = bookInfo;

            const userId = doc.id_user;
            const userInfo = await authService.findById(userId);
            doc.userInfo = userInfo;
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while retrieving"));
    }
    return res.send(documents);
}

//Tìm thông tin mượn sách theo id_user
exports.findBorrowBookInfo = async (req, res, next) => {
    let documents = [];

    try {
        const borrowBookService = new BorrowBookService(MongoDB.client);
        documents = await borrowBookService.findByIdUser(req.params.id);

        const bookService = new BookService(MongoDB.client);
        const authService = new AuthService(MongoDB.client);
        for (const doc of documents) {
            const bookId = doc.id_book;
            const bookInfo = await bookService.findById(bookId);
            doc.bookInfo = bookInfo;

            const userId = doc.id_user;
            const userInfo = await authService.findById(userId);
            doc.userInfo = userInfo;
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while retrieving"));
    }
    return res.send(documents);
}

//Mượn sách
exports.borrowingBook = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const id_book = req.body.id_book;
        const existsBook = await bookService.findById(id_book);
        const quantity = existsBook.quantity - 1;
        const editBookData = {
            quantity: quantity,
        };
        await bookService.updateBook(id_book, editBookData);

        const borrowBookService = new BorrowBookService(MongoDB.client);
        const document = await borrowBookService.borrowingBook(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred")
        );
    }
}


//Trả sách
exports.returnBook = async (req, res, next) => {
    try {
        const borrowBookService = new BorrowBookService(MongoDB.client);
        const idUser = req.body.id_user;
        const idBook = req.body.id_book;
        const returnBookData = {
            return_day: req.body.return_day
        }
        console.log(returnBookData)
        const document = await borrowBookService.returnBook({idUser, idBook}, returnBookData);
        const bookService = new BookService(MongoDB.client);
        const existsBook = await bookService.findById(idBook);
        const quantity = existsBook.quantity + 1;
        const editBookData = {
            quantity: quantity,
        };
        await bookService.updateBook(idBook, editBookData);
        if (!document) {
            return next(new ApiError(404, "Not found"));
        }
        return res.send({ message: "Update successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error while updating with id=${req.params.id}`)
        );
    }
}

//Thêm sách
exports.createBook = async (req, res, next) => {
    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const publisherName = req.body.publisher;
        const document = await bookPublisherService.findByName(publisherName);
        
        const bookService = new BookService(MongoDB.client);
        const newBookData = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            publishing_year: req.body.publishing_year,
            id_publisher: document[0]._id,
        };
        const newBook = await bookService.createBook(newBookData);
        return res.send(newBook);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating book")
        );
    }
};

//Tìm tất cả sách hoặc tìm sách theo tên
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.find({});
        }
        for (const doc of documents) {
            const publisherId = doc.id_publisher;
            const publisherInfo = await bookPublisherService.findById(publisherId);
            doc.publisherInfo = publisherInfo;
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving books"));
    }
    return res.send(documents);
}

//Tìm sách theo id
exports.findOneBook = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const publisherId = document.id_publisher;
        const publisherInfo = await bookPublisherService.findById(publisherId);
        document.publisherInfo = publisherInfo;
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving book with id=${req.params.id}`
            )
        );
    }
};

//Chỉnh sửa sách
exports.updateBook = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    
    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const publisherName = req.body.publisher;
        const document = await bookPublisherService.findByName(publisherName);

        const bookService = new BookService(MongoDB.client);
        const editBookData = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            publishing_year: req.body.publishing_year,
            id_publisher: document[0]._id,
        };
        const editBook = await bookService.updateBook(req.params.id, editBookData);
        if (!editBook) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book publisher was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating book with id=${req.params.id}`)
        );
    }
};

//Xóa sách
exports.deleteBook = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.deleteBook(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete book with id=${req.params.id}`
            )
        );
    }
};

//Đăng ký
exports.register = async (req, res, next) => {
    try {
        const authService = new AuthService(MongoDB.client);
        const { name, phone, birthdate, gender, address, password } = req.body;
        await authService.register(name, phone, birthdate, gender, address, password);
        return res.send({ message: "Register successfully" });
    } catch (error) {
        return next(new ApiError(404, "User already exists"));
    }
}


//Đăng nhập
exports.login = async (req, res, next) => {
    if (!req.body?.phone) {
        return next(new ApiError(400, "Phone cannot be empty"));
    }
    
    if (!req.body?.password) {
        return next(new ApiError(400, "Password cannot be empty"));
    }
    try {
        const authService = new AuthService(MongoDB.client);
        const { phone, password } = req.body;
        const document = await authService.login(phone, password);
        if (document.role === "admin") {
            const role = { role: "admin" };
            return res.send(role);
        } 
        else if (document.role === "user") {
            return res.send(document);
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(404, "Invalid phone number or password"));
    }
};

//Tìm danh sách các nhà xuất bản
exports.findAllPublisher = async (req, res, next) => {
    let documents = [];

    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await bookPublisherService.findByName(name);
        } else {
            documents = await bookPublisherService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving publishers"));
    }
    return res.send(documents);
}

//Tìm NXB theo id
exports.findOnePublisher = async (req, res, next) => {
    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const document = await bookPublisherService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book publisher not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving book publisher with id=${req.params.id}`
            )
        );
    }
}

//Tạo nhà xuất bản mới
exports.createPublisher = async (req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    }

    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const document = await bookPublisherService.createPublisher(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the book publisher")
        );
    }
};

//Chỉnh sửa nhà xuất bản
exports.updatePublisher = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const document = await bookPublisherService.updatePublisher(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Book publisher not found"));
        }
        return res.send({ message: "Book publisher was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating book publisher with id=${req.params.id}`)
        );
    }
};

//Xóa NXB
exports.deletePublisher = async (req, res, next) => {
    try {
        const bookPublisherService = new BookPublisherService(MongoDB.client);
        const document = await bookPublisherService.deletePublisher(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book publisher not found"));
        }
        return res.send({ message: "Book publisher was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete book publisher with id=${req.params.id}`
            )
        );
    }
}