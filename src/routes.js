import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: 'history', // Use browser history
    routes: [
        {
            path: "/",
            name: "Billings",
            component: () => import("./components/Billings"),
        },
        {
            path: "/billings",
            name: "Billings",
            component: () => import("./components/Billings"),
        },
        {
            path: "/billing/:id",
            name: "Billings",
            component: () => import("./components/Billing"),
    }
    ]
});//
//
export default router;