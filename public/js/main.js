import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../config/cms-route';
Vue.prototype.axios = axios;
Vue.use(Vuex);
new Vue({
    router,
    el:"#app",
    data () {
        return {
        }
    },
    methods:{

    },
    mounted:function () {

    }
});
