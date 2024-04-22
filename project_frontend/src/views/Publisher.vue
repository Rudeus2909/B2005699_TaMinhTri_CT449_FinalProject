
<template>
    <div class="page row">
        <AdminHeader />
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>Danh sách các nhà xuất bản trên thư viện</h4>
            <BookList 
            v-if="filteredPublishersCount > 0"
            :books="filteredPublishers"
            v-model:activeIndex="activeIndex"/>
            <p v-else>Không có nhà xuất bản nào trên thư viện!</p>

            <div class="mt-3 row justify-content-around aligm-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <button class="btn btn-sm btn-success" @click="goToAddPublisher()">
                    <i class="fas fa-plus"></i> Thêm NXB
                </button>

            </div>
        </div>

        <div class="mt-3 col-md-6">
            <div v-if="activePublisher">
                <h4>
                    Chi tiết nhà xuất bản
                    <i class="fas fa-address-card"></i>
                </h4>
                <PublisherCard :publisher="activePublisher"/>
                <router-link :to="{ name: 'publisher.edit', params: { id: activePublisher._id }, }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Sửa
                    </span>
                </router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
import PublisherCard from "@/components/PublisherCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";
import AdminHeader from "@/components/HeaderAdmin.vue";
import router from '@/router';

export default {
    components: {
        PublisherCard,
        InputSearch,
        BookList,
        AdminHeader,
    },
    data() {
        return {
            publishers: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        publisherStrings() {
            return this.publishers.map((publisher) =>{
                const { name, address } = publisher;
                return [name, address].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) =>
                this.publisherStrings[index].includes(this.searchText));
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await BookService.getAllPublisher();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },

        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" })
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>