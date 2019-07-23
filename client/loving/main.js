import Vue from 'vue'
import App from './App'

import {appUtils} from "./static/utils/utils.js"
//lotusUtils工具类方法注入到Vue
Vue.prototype.$appUtils = appUtils;
Vue.config.productionTip = false;

//暂无数据
import AppNoData from "./components/appNoData/appNoData.vue";
Vue.component('AppNoData',AppNoData);

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
