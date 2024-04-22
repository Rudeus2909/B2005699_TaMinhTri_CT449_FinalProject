
<template>
        <header>
        <nav>
            <label for="" class="logo">Thư viện</label>
            <ul>
                <li><router-link :to="{ name: 'library' }">Trang chủ</router-link></li>
                <li><router-link :to="{ name: 'borrow.list', params: {id: this.id} }">Mượn sách</router-link></li>
                <li><router-link :to="{ name: 'login' }">Đăng xuất</router-link></li>
            </ul>
        </nav>
    </header>
    <div class="page row">
        <div class="col-md-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>Danh sách các quyển sách trên thư viện</h4>
            <BookList 
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
            v-model:activeIndex="activeIndex"/>
            <p v-else>Không có quyển sách nào trên thư viện!</p>

            <div class="mt-3 row justify-content-around aligm-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>

        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Chi tiết quyển sách
                    <i class="fas fa-address-card"></i>
                </h4>
                <BookCard :book="activeBook"/>
                <button type="button" class="mt-2 btn btn-success" @click="borrowingBook">
                    Mượn sách <span class="badge badge-light"></span>
                </button>
                <p> {{ message }} </p>
            </div>
        </div>
        
    </div>
</template>
<style>
header {
    background-color: #333;
    color: #fff;
    padding: 20px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}
.logo {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
}

.logo a {
    color: #fff;
    text-decoration: none;
}

nav {
    height: 80px;
}
label.logo {
    color: white;
    font-size: 35px;
    line-height: 80px;
    padding: 0 100px;
}
nav ul{
    float: right;
    margin-right: 20px;
}
nav ul li{
    display: inline-block;
    line-height: 80px;
    margin: 0 5px;
}
nav ul li a{
    color: white;
    font-size: 17px;
    padding: 7px 13px;
    border-radius: 3px;
    text-transform: uppercase;
}
a.active, a:hover{
    background: red;
    transition: .5s;
    color: #fff;
    text-decoration: none;
}
</style>

<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
            borrowBook: {
                id_user: this.id,
                id_book: "",
                borrowed_day: "",
                return_day: "",
            },
            message: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) =>{
                const { name, price, quantity, publishing_year, id_publisher } = book;
                return [name, price, quantity, publishing_year, id_publisher].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_contact, index) =>
                this.bookStrings[index].includes(this.searchText));
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        getCurrentDate() {
            const now = new Date();
            const day = ("0" + now.getDate()).slice(-2);
            const month = ("0" + (now.getMonth() + 1)).slice(-2);
            const year = now.getFullYear();
            return `${day}/${month}/${year}`;
        },
        async retrieveBooks() {
            try {
                this.books = await BookService.getAllBooks();
            } catch (error) {
                console.log(error);
            }
        },

        async borrowingBook() {
            try {
                if (this.activeBook) {
                    this.borrowBook.id_book = this.activeBook._id; 
                }
                const borrowedDay = this.getCurrentDate();
                this.borrowBook.borrowed_day = borrowedDay;
                await BookService.borrowBook(this.borrowBook);
                this.message = "Mượn sách thành công";
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>