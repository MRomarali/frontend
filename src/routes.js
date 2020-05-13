import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    //mode: 'history', // Use browser history
    routes: [
        {
            path: "/",
            name: "Billings",
            component: () => import("./components/Billings"),
        }
    ]
});
export default router;