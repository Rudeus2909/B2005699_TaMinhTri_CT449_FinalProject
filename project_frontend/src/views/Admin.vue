
<template>
    <div class="page row">
        <AdminHeader />
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
                
                <button class="btn btn-sm btn-success" @click="goToAddBook()">
                    <i class="fas fa-plus"></i> Thêm sách
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
                <router-link :to="{ name: 'book.edit', params: { id: activeBook._id }, }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Chỉnh sửa
                    </span>
                </router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";
import AdminHeader from "@/components/HeaderAdmin.vue";

export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
        AdminHeader,
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
        async retrieveBooks() {
            try {
                this.books = await BookService.getAllBooks();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        goToAddBook() {
            this.$router.push({ name: "book.add" });
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>