// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import routes from './config/routes.js';
import store from './config/store.js';
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import VueI18n from 'vue-i18n';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import util from './assets/js/util.js'; //乘除方法，js的算数运算真是SB
// import './assets/css/theme.less';//重置iview主题颜色

import App from './App.vue';
import Api from './config/api';
import $ from '@js/jquery.min.js';
var moment = require('moment');

Vue.use(iView);
Vue.use(VueClipboard)
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(VueI18n);

// Vue.prototype.host = "https://www.chulian.top"; //测试
// Vue.prototype.host = "https://www.bhuo.top"; //生产
// Vue.prototype.host = "http://47.74.216.147"; //新加坡
Vue.prototype.host = "http://39.104.119.155"; //测试


Vue.prototype.api = Api;
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/json;charset=utf-8'
};
const router = new VueRouter({
    mode: 'hash',
    routes
})
const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages: {
        'zh': require('./assets/lang/zh.js'),
        'en': require('./assets/lang/en.js')
    }
});
Vue.http.interceptors.push((request, next) => {
    //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
    request.headers.set('x-auth-token', localStorage.getItem('TOKEN'));
    next((response) => {
        //登录极验证时需获取后台返回的TOKEN值
        var xAuthToken = response.headers.get('x-auth-token');
        if (xAuthToken != null && xAuthToken != '') {
            localStorage.setItem('TOKEN', xAuthToken);
        }
        //

        if (response.body.code == '4000' || response.body.code == '3000') {
            store.commit('setMember', null);
            router.push('/login');
            return false;
        }
        return response;
    });
});

Vue.config.productionTip = false
Vue.filter('timeFormat', function(tick) {
    return moment(tick).format("HH:mm:ss");
});
Vue.filter('dateFormat', function(tick) {
    return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter('toFixed', function(number, scale) {
    return new Number(number).toFixed(scale);
});
Vue.filter('toPercent', function(point) {
    var str = Number(point * 100).toFixed(1);
    str += "%";
    return str;
});
//数字进行下舍入(舍去)
function toFloor(number, scale = 8) {
    if (new Number(number) == 0) { //如果是"0.0000000000000000"
        return 0;
    }
    let str = number + ""; //转字符串
    if (str.indexOf('e') > -1 || str.indexOf('E') > -1) { //科学计数法
        let num = new Number(number).toFixed(scale + 1),
            str = num + "";
        return str.substring(0, str.length - 1);
    } else if (str.indexOf(".") > -1) { //小数
        if (scale == 0) {
            return str.substring(0, str.indexOf("."));
        }
        return str.substring(0, str.indexOf(".") + scale + 1); //截取指定位数
    } else { //整数
        return str;
    }
}
Vue.filter('toFloor', (number, scale) => {
    return toFloor(number, scale);
});
Vue.prototype.toFloor = toFloor;



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
})