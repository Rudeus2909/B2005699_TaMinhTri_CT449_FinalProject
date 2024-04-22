<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import BookService from "@/services/book.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book", "add:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            name: yup.string().required("Tên phải có giá trị").min(5, "Tên có ít nhất 5 kí tự").max(150, "Tên có nhiều nhất 150 kí tự"),
            price: yup.number().required("Phải có giá").moreThan(0, "Giá phải lớn hơn 0"),
            quantity: yup.number().moreThan(0, "Số lượng phải lớn hơn 0"),
            publishing_year: yup.number().lessThan(2025, "Năm phát hành phải nhỏ hơn 2025"),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
            publishers: [],
        };
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await BookService.getAllPublisher();
            } catch (error) {
                console.log(error);
            }
        },
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        addBook() {
            this.$emit("add:book", this.bookLocal);
        }
    },
    mounted() {
        this.retrievePublishers();
    },
};
</script>

<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên sách</label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name"/>
            <ErrorMessage name="name" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="text" class="form-control" v-model="bookLocal.price"/>
            <ErrorMessage name="price" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field name="quantity" type="text" class="form-control" v-model="bookLocal.quantity"/>
            <ErrorMessage name="quantity" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="publishing_year">Năm phát hành</label>
            <Field name="publishing_year" type="text" class="form-control" v-model="bookLocal.publishing_year"/>
            <ErrorMessage name="publishing_year" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="publisher">Nhà phát hành</label>
            <select v-model="bookLocal.publisher" class="form-control">
                <option v-for="publisher in publishers" :value="publisher.name">{{ publisher.name }}</option>
            </select>
            <ErrorMessage name="publisher" class="error-feedback"/>
        </div>

        <div class="form-group">
            <button class="btn btn-primary" v-if="!bookLocal._id" @click="addBook">Lưu</button>
            <button class="btn btn-primary" v-if="bookLocal._id">Lưu</button>
            <button class="btn btn-danger ml-2" v-if="bookLocal._id" type="button" @click="deleteBook">Xóa</button>
        </div>
    </Form>
</template>