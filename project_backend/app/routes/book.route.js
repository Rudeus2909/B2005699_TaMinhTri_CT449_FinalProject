const express = require("express");
const library = require("../controllers/book.controller");

const router = express.Router();

router.route("/").get(library.findAll).post(library.borrowingBook).put(library.returnBook);

router.route("/:id/borrow").get(library.findBorrowBookInfo);

router.route("/register").post(library.register);
router.route("/login").post(library.login);

//Admin
router.route("/admin/book").post(library.createBook);

router.route("/admin/book/:id").get(library.findOneBook)
                                .put(library.updateBook)
                                .delete(library.deleteBook);

router.route("/admin/publisher").post(library.createPublisher)
                                .get(library.findAllPublisher);
router.route("/admin/publisher/:id").put(library.updatePublisher)
                                    .delete(library.deletePublisher)
                                    .get(library.findOnePublisher);
router.route("/admin/borrow_book").get(library.findAllBorrowBook);

module.exports = router;
