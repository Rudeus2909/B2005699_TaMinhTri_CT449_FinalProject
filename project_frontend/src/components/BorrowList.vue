<template>
<ul class="list-group">
  <li class="list-group-item" 
        v-for="(borrow_book, index) in borrow_books"
        :key="borrow_book._id"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)">
        <b>Tên sách: </b>
        {{ borrow_book.bookInfo.name }}
        <br>
        <b>Ngày mượn: </b>
        {{ borrow_book.borrowed_day }}
        <br>
        <b>Ngày trả: </b>
        <span v-if="borrow_book.return_day != ''">{{ borrow_book.return_day }}</span>
        <span v-else>Chưa trả</span>
        <br>
        <b>Người mượn: </b>
        {{ borrow_book.userInfo.name }}
        <br>
        <span>
            <button v-if="borrow_book.return_day == ''" 
            class="btn btn-danger"
            @click="returnBook(borrow_book.userInfo._id, borrow_book.bookInfo._id)">
                Trả sách
            </button>
        </span>
    </li>
</ul>
</template>

<script>
export default {
    props: {
        borrow_books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "returnBook"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        getCurrentDate() {
            const now = new Date();
            const day = ("0" + now.getDate()).slice(-2);
            const month = ("0" + (now.getMonth() + 1)).slice(-2);
            const year = now.getFullYear();
            return `${day}/${month}/${year}`;
        },
        returnBook(id_user, id_book) {
            const return_day = this.getCurrentDate();
            this.$emit("returnBook", {id_user, id_book, return_day});
        }
    }
};
</script>

<style>
.list-group-item {
  position: relative;
}

.list-group-item button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>