<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Giá:</strong>
            {{ book.price }}
        </div>
        <div class="p-1">
            <strong>Số lượng:</strong>
            {{ book.quantity }}
        </div>
        <div class="p-1">
            <strong>Năm phát hành:</strong>
            {{ book.publishing_year }}
        </div>
        <div class="p-1">
            <strong>Tên nhà phát hành:</strong>
            {{ book.publisherInfo.name }}
        </div>
    </div>
</template>