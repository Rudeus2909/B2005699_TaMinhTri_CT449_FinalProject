<template>
    <div v-if="book">
        <AdminHeader />
        <h4>Chỉnh sửa thông tin sách</h4>
        <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook"/>
        <p> {{ message }} </p>
    </div>
</template>

<script>
import BookForm from '../components/BookForm.vue';
import BookService from "@/services/book.service";
import AdminHeader from "@/components/HeaderAdmin.vue";

export default {
    components: {
        BookForm,
        AdminHeader,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.getBook(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await BookService.updateBook(this.book._id, data);
                this.message = "Sách được cập nhật thành công";
            } catch (error) {
                console.log(error);
            } 
        },
        async deleteBook() {
            if (confirm("Bạn có muốn xóa sách này?")) {
                try {
                    await BookService.deleteBook(this.book._id);
                    this.$router.push({ name: "admin" });
                } catch (error) {
                console.log(error);
                } 
            }
        }
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>