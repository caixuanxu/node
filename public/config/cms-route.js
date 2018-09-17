import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const login = resolve => {
    require.ensure(["../html/src/login.vue"], () => {
        resolve(require("../html/src/login.vue"))
    })
};
const routes = [
    {
        path: '/',
        name:'login',
        component: login
    },
];
export default new VueRouter({
    routes
});
