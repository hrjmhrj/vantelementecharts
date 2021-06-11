import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import { successTip,failedTip,warningTip } from "./plugins/element";
import store from './store'
import request from '@/utils/request';
//import '@/assets/font/font.css'
//import {getAddress} from "./api/public";
/** 引入外部自定义scss样式 */
import './assets/styles/element-variables.scss'
import {customLoadingOpen, customLoadingClose} from '@/utils/loading'

// 引入echarts
import echarts from 'echarts'
// 全局echarts
Vue.prototype.$echarts = echarts

//全局挂载提示组件
Vue.prototype.successTip = successTip
Vue.prototype.failedTip = failedTip
Vue.prototype.warningTip = warningTip

Vue.config.productionTip = false;
Vue.prototype.axios = request;
// 自定义加载中
Vue.prototype.customLoadingOpen = customLoadingOpen;
Vue.prototype.customLoadingClose = customLoadingClose;


// 页面刷新时，重新赋值deviceId
/*store.commit('setDeviceId',
    sessionStorage.getItem("deviceId")
);*/

/*getAddress().then(res=>{
  let address = res.data.data;
  if(address){
    localStorage.setItem('webAddress',address['webAddress']);
    localStorage.setItem('apiAddress',address['apiAddress']);
  }else {
    this.$message.error('外网地址异常，请联系管理员进行处理');
  }
})*/


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
