<template>
    <div>
        <AdminHeader />
        <h4>Thêm sách</h4>
        <BookForm :book="book" @add:book="addBook"/>
        <p> {{ message }} </p>
    </div>
</template>

<script>
import BookForm from '../components/BookForm.vue';
import AdminHeader from "@/components/HeaderAdmin.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookForm,
        AdminHeader,
    },
    data() {
        return {
            book: {
                name: '',
                price: '',
                quantity: '',
                publishing_year: '',
                publisher: '',
            },
            message: "",
        }
    },
    methods: {
        async addBook(data) {
            try {
                await BookService.createBook(data);
                this.message = "Thêm sách thành công";
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>