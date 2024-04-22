<script>
import BorrowList from "../components/BorrowList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BorrowList,
        InputSearch,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            borrow_books: [],
            activeIndex: -1,
            searchText: "",
            return_book: {
                id_user: "",
                id_book: "",
                return_day: "",
            },
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        borrowBookStrings() {
            return this.borrow_books.map((borrow_book) => {
                const { id_book, id_user, borrowed_day, return_day } = borrow_book;
                return [id_book, id_user, borrowed_day, return_day].join("");
            });
        },
        filteredBorrowBooks() {
            if (!this.searchText) return this.borrow_books;
            return this.borrow_books.filter((_id, index) =>
                this.borrowBookStrings[index].includes(this.searchText));
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBorrowBooks[this.activeIndex];
        },
        filteredBorrowBooksCount() {
            return this.filteredBorrowBooks.length;
        },
    },
    methods: {
        async retrieveBorrowBooks() {
            try {
                this.borrow_books = await BookService.getAllBorrowBooks(this.id);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBorrowBooks();
            this.activeIndex = -1;
        },
        async returnBook({id_user, id_book, return_day}) {
            this.return_book.id_user = id_user;
            this.return_book.id_book = id_book;
            this.return_book.return_day = return_day;
            if (confirm("Bạn muốn trả sách này")) {
                try {
                    await BookService.returnBook(this.return_book);
                    this.$router.push({ name: "library", params: { id_user } });
                } catch (error) {
                console.log(error);
                } 
            }
        }
    },
    mounted() {
        this.refreshList();
    },
}
</script>

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
    <div>
        <div class="page row">
            <div class="col-md-12">
                <InputSearch v-model="searchText" />
            </div>

            <div class="mt-3 col-md-6">
                <h4>Các sách đã mượn</h4>
                <BorrowList v-if="filteredBorrowBooksCount > 0"
                    :borrow_books="filteredBorrowBooks"
                    v-model:activeIndex="activeIndex"
                    @returnBook="returnBook"/>
                <p v-else>Chưa mượn sách nào trên thư viện!</p>
            </div>

        </div>
    </div>
</template>