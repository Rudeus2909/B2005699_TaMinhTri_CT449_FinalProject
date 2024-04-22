<script>
import AdminHeader from "@/components/HeaderAdmin.vue";
import InputSearch from "@/components/InputSearch.vue";
import BorrowListManager from "../components/BorrowListManager.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        InputSearch,
        AdminHeader,
        BorrowListManager,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
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
                const { name, address } = book;
                return [name, address].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
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
        async retrieveBooks() {
            try {
                this.books = await BookService.getAllBorrowBooksWithAdmin();
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
}
</script>

<template>
    <div class="page row">
        <AdminHeader />
        <div class="col-md-10">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-12">
            <h4>Danh sách mượn sách</h4>
            <BorrowListManager 
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
            v-model:activeIndex="activeIndex"/>
            <p v-else>Không có ai mượn sách trên thư viện!</p>
        </div>
    </div>
</template>