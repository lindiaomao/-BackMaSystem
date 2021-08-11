/*
 * @Author: your name
 * @Date: 2021-07-22 10:39:27
 * @LastEditTime: 2021-08-11 14:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \managementSystem\demo\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


// 引入axios
import axios from "axios";
Vue.prototype.$http = axios

//引入重置样式
import './common/reset.css'
import './assets/iconfont/iconfont.css'

// 引入时间格式化
import dataMethod from './store/data'
Vue.use(dataMethod)

//引入Elemen-ui组件
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
	if(sessionStorage.getItem("token")){
		next()
	}else{
		if(to.path == '/home'){
			next()
		}else{
			next('/home')
		}
	}
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
