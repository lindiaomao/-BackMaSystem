/*
 * @Author: your name
 * @Date: 2021-07-22 10:39:27
 * @LastEditTime: 2021-08-05 14:03:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \managementSystem\demo\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../components/welcome.vue"
import Users  from "../components/users/users.vue"
import Roles from "../components/roles/roles.vue"
import Rights from "../components/rights/rights.vue"
import Goods from "../components/goods/goods.vue"
import Params from "../components/params/params.vue"
import Categories from '../components/categories/categories.vue';
import Orders from '../components/orders/orders.vue';
import Reports from "../components/reports/reports.vue"
import Wel from "../components/wel.vue"
import AddGoods from '../components/goods/addGoods/addGoods.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
	children:[
		{path:'/',name:'Wel',component:Wel},
		{path:'/users',name:'Users',component:Users},
		{path:'/roles',name:'Roles',component:Roles},
		{path:'/rights',name:'Rights',component:Rights},
		{path:'/goods',name:'Goods',component:Goods},
		{path:'/params',name:'Params',component:Params},
		{path:'/categories',name:'Categories',component:Categories},
		{path:'/orders',name:'Orders',component:Orders},
		{path:'/reports',name:'Reports',component:Reports},
		{path:'/addGoods',name:'AddGoods',component:AddGoods},
	]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
