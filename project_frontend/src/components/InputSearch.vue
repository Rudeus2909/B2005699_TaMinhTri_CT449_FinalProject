<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<template>
    <div class="input-group">
        <input type="text" 
        class="form-control" 
        placeholder="Nhập từ khóa..." 
        :value="modelValue" 
        @input="updateModelValue" 
        @keyup.enter="submit">
        <button class="btn btn-outline-secondary"
                type="button"
                @click="submit">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>

<style>
.input-group {
    margin-top: 30px;
}
</style>