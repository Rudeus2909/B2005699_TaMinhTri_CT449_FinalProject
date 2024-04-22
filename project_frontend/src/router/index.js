import { createWebHistory, createRouter } from "vue-router";
import Library from "@/views/Library.vue";

const routes = [
    {
        path: "/:id",
        name: "library",
        component: Library,
        props: true,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/LoginForm.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../components/RegisterForm.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../views/Admin.vue"),
    },
    {
        path: "/publisher",
        name: "publisher",
        component: () => import("../views/Publisher.vue"),
    },
    {
        path: "/add_Publisher",
        name: "publisher.add",
        component: () => import("../views/AddPublisher.vue"),
    },
    {
        path: "/edit_publisher/:id",
        name: "publisher.edit",
        component: () => import("../views/EditPublisher.vue"),
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/add_book",
        name: "book.add",
        component: () => import("../views/AddBook.vue"),
    },
    {
        path: "/edit_book/:id",
        name: "book.edit",
        component: () => import("../views/EditBook.vue"),
        props: true,
    },
    {
        path: "/:id/borrow",
        name: "borrow.list",
        component: () => import("../views/BorrowBookList.vue"),
        props: true,
    },
    {
        path: "/borrow",
        name: "borrow.manager",
        component: () => import("../views/BorrowBookManager.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;