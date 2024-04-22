<template>
    <div v-if="publisher">
        <AdminHeader />
        <h4>Hiệu chỉnh nhà xuất bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher"/>
        <p> {{ message }} </p>
    </div>
</template>

<script>
import PublisherForm from '../components/PublisherForm.vue';
import BookService from "@/services/book.service";
import AdminHeader from "@/components/HeaderAdmin.vue";

export default {
    components: {
        PublisherForm,
        AdminHeader,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await BookService.getPublisher(id);
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
        async updatePublisher(data) {
            try {
                await BookService.updatePublisher(this.publisher._id, data);
                this.message = "Nhà xuất bản được cập nhật thành công";
            } catch (error) {
                console.log(error);
            } 
        },
        async deletePublisher() {
            if (confirm("Bạn có muốn xóa nhà xuất bản này?")) {
                try {
                    await BookService.deletePublisher(this.publisher._id);
                    this.$router.push({ name: "admin" });
                } catch (error) {
                console.log(error);
                }
            }
        }
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    },
};
</script>