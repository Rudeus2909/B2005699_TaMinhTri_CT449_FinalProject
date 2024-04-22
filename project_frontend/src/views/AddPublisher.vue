<template>
    <div>
        <AdminHeader />
        <h4>Thêm nhà xuất bản</h4>
        <PublisherForm :publisher="publisher" @add:publisher="addPublisher"/>
        <p> {{ message }} </p>
    </div>
</template>

<script>
import PublisherForm from '../components/PublisherForm.vue';
import AdminHeader from "@/components/HeaderAdmin.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        PublisherForm,
        AdminHeader,
    },
    data() {
        return {
            publisher: {
                name: '',
                address: '',
            },
            message: "",
        }
    },
    methods: {
        async addPublisher(data) {
            try {
                await BookService.createPublisher(data);
                this.message = "Nhà xuất bản được thêm thành công";
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>