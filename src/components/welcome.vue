<template>
  <div class="welcome">
    <el-container>
      <el-header>
        <div class="head_left">
          <img src="../img/touxaing.png" alt="" />
          <span>Vue小林后台</span>
        </div>
        <el-row
          ><el-button type="primary" size="small" @click="go_back"
            >退出</el-button
          ></el-row
        >
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'180px':'45px'">
			<!-- 收起导航栏 -->
			<div style="color:#fff; background-color:#70d2fb; cursor: pointer;" :collapse="isCollapse" @click="isCollapse=!isCollapse">|||</div>
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
				:unique-opened="true"
                text-color="#fff"
				:router="true"
                active-text-color="#ffd04b"
              >
                <el-submenu v-for="(item) in  authNameList" :key="item.id" :index="item.id+''">
                  <template slot="title" >
                    <i :class="icon[item.id]"></i>
                    <span>{{item.authName}}</span>
                  </template>
                  <el-menu-item-group v-for="citem in item.children" :key="citem.id">
                    <el-menu-item :index="citem.path">{{citem.authName}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
			<router-view />
		</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {reqMenus} from '../network/api'
export default {
  name: "welcome",
  data() {
    return {
		isCollapse:true,//是否展开
		authNameList:[],//左侧菜单栏数据
		icon:{
			"125":"iconfont icon-yonghuguanli",
			"103":"iconfont icon-quanxianguanli",
			"101":"iconfont icon-shangpinguanli",
			"102":"iconfont icon-dingdanguanli",
			"145":"iconfont icon-shujutongji"
		}
	};
  },
  create(){
  },
  mounted(){
	  this.getMenusList()
  },
  methods: {
	// 获取左侧菜单栏
	async getMenusList(){
		const res = await reqMenus()
		if(res.meta.status == 200){
			this.authNameList = res.data
		}else{
			return this.$message.error(res.meta.msg)
		}
	},
    //   退出
    go_back() {
      this.$router.push("/home");
      sessionStorage.removeItem("token");
    },
  },
};
</script>

<style lang='scss'>
.welcome {
	width: 100%;
	height: 900px;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: rgb(26, 26, 36);
    color: #fff;
    .head_left {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        height: 100%;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 50%;
      }
    }
  }
  .el-aside{
	  height: 877px;
	  background: rgb(41, 47, 53);
	  .el-submenu{
		  left: 20px;
		 
		  .iconfont{
			  margin-right: 10px;
		  }
		  .el-submenu__title{
			  left: 0;
			   padding: 0;
		  }
	  }
  }
  .el-main{
	  background-color: rgb(180, 189, 180);
  }
}
</style>