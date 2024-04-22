<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:publisher", "delete:publisher", "add:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            name: yup.string().required("Tên phải có giá trị").min(5, "Tên phải có ít nhất 5 kí tự").max(50, "Tên có nhiều nhất 50 kí tự"),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự"),
        });
        return {
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal.id);
        },
        addPublisher() {
            this.$emit("add:publisher", this.publisherLocal);
        },
    },
};
</script>

<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="name">Tên NXB</label>
            <Field name="name" type="text" class="form-control" v-model="publisherLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ NXB</label>
            <Field name="address" type="text" class="form-control" v-model="publisherLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary" v-if="!publisherLocal._id" @click="addPublisher">Lưu</button>
            <button class="btn btn-primary" v-if="publisherLocal._id">Lưu</button>
            <button class="ml-2 btn btn-danger" v-if="publisherLocal._id" type="button" @click="deletePublisher">Xóa</button>
        </div>
    </Form>
</template>

<style scoped>
@import "@/assets/form.css";
</style>