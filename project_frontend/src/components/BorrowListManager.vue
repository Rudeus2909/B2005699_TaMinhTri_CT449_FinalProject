<script>
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group">
        <li class="list-group-item"
            v-for="(book, index) in books"
            :key="book._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)">
            <b>Tên sách: </b>
            {{ book.bookInfo.name }}
            <br>
            <b>Người mượn: </b>
            {{ book.userInfo.name }}
            <br>
            <b>Ngày mượn: </b>
            {{ book.borrowed_day }}
            <br>
            <b>Ngày trả: </b>
            <span v-if="book.return_day != ''">{{ book.return_day }}</span>
            <span v-else>Chưa trả</span>
        </li>
    </ul>
</template>
