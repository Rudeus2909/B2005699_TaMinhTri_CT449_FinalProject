import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/libraries") {
        this.api = createApiClient(baseUrl);
    }
    //Lấy danh sách mượn sách theo id người dùng
    async getAllBorrowBooks(id) {
        return (await this.api.get(`/${id}/borrow`)).data;
    }
    //Mượn sách
    async borrowBook(data) {
        return (await this.api.post("/", data)).data;
    }
    //Trả sách
    async returnBook(data) {
        return (await this.api.put("/", data)).data;
    }
    //Lấy tất cả sách
    async getAllBooks() {
        return (await this.api.get("/")).data;
    }
    //Thêm sách
    async createBook(data) {
        return (await this.api.post("/admin/book", data)).data;
    }
    //Tìm sách theo id
    async getBook(id) {
        return (await this.api.get(`/admin/book/${id}`)).data;
    }
    //Chỉnh sửa sách
    async updateBook(id, data) {
        return (await this.api.put(`/admin/book/${id}`, data)).data;
    }
    //Xóa sách
    async deleteBook(id) {
        return (await this.api.delete(`/admin/book/${id}`)).data;
    }
    //Đăng nhập
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    //Lấy tất cả nhà xuất bản
    async getAllPublisher() {
        return (await this.api.get("/admin/publisher")).data;
    }
    //Thêm nhà xuất bản
    async createPublisher(data) {
        return (await this.api.post("/admin/publisher", data)).data;
    }
    //Tìm NXB theo id
    async getPublisher(id) {
        return (await this.api.get(`/admin/publisher/${id}`)).data;
    }
    //Chỉnh sửa NXB
    async updatePublisher(id, data) {
        return (await this.api.put(`/admin/publisher/${id}`, data)).data;
    }
    //Xóa NXB
    async deletePublisher(id) {
        return (await this.api.delete(`/admin/publisher/${id}`)).data;
    }
    //Lấy tất cả danh sách mượn sách
    async getAllBorrowBooksWithAdmin() {
        return (await this.api.get("/admin/borrow_book")).data;
    }
}

export default new BookService();