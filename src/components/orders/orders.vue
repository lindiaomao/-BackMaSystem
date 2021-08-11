<template>
  <div class="order">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
		<el-form>
			<!-- 搜索框 -->
			<el-row>
				<el-col :span="12">
					<el-input
						v-model="userInfo.query"
						class="input-with-select"
						placeholder="请输入内容"
						clearable
						@change="this.getOrderList"
					>
						<el-button
							slot="append"
							:disabled="userInfo.query == '' ? true : false"
							icon="el-icon-search"
							circle
						></el-button>
					</el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-table stripe :data="tableData" border style="width: 100%">
					<el-table-column type="index" label="">
					</el-table-column>
					<el-table-column prop="order_number" label="订单编号" width="220">
					</el-table-column>
					<el-table-column prop="order_price" label="订单价格">
					</el-table-column>
					<el-table-column prop="pay_status" label="是否付款">
						<template slot-scope="scope">
							<el-row>
								<el-button v-if="scope.row.pay_status == 0" size="small" type="warning">未付款</el-button>
								<el-button v-else size="small" type="success">已付款</el-button>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column prop="is_send" label="是否发货">
					</el-table-column>
					<el-table-column prop="create_time" :formatter="formatDate" label="下单时间" width="180">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-row>
								<el-button size="mini" @click="editOrder(scope.row)" class="el-icon-edit" type="primary"></el-button>
								<el-button size="mini" @click="location(scope.row)" class="el-icon-location-outline" type="success"></el-button>
							</el-row>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<div class="block">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="userInfo.pagenum"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="userInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
				</el-pagination>
			</div>
		</el-form>
    </el-card>
  </div>
</template>

<script>
import { reqOrderList } from "../../network/api";
export default {
	data(){
		return{
			total:0,//总条数
			userInfo:{
				query:'',//查询参数
				pagenum:1,//当前页码
				pagesize:5,//每页显示条数
				user_id:'',//用户 ID
				pay_status:'',//支付状态
				is_send:'',//是否发货
				order_fapiao_title:'',//['个人','公司']
				order_fapiao_company:'',//公司名称
				order_fapiao_content:'',//发票内容
				consignee_addr:'',//发货地址
			},
			tableData:[],//表格数据
		}
	},
	mounted(){
		this.getOrderList()
	},
	methods:{
		handleSizeChange(val) {
			this.userInfo.pagesize = val
			this.getOrderList()
		},
		handleCurrentChange(val) {
			this.userInfo.pagenum = val
			this.getOrderList()
		},
		// 定位
		location(e){
			console.log(e);
		},
		editOrder(e){
			console.log(e);
		},
		// 点击搜索
		getUsersList(){
			console.log(32);
			this.getOrderList()
		},
		// 获取数据
		async getOrderList(){
			const {userInfo} = this
			const orderVal = await reqOrderList(userInfo)
			if(orderVal.meta.status == 200){
				this.tableData = orderVal.data.goods
				this.total = orderVal.data.total
			}
			console.log(orderVal);
		}
	}
};
</script>

<style lang='scss' scoped>
.el-card{
	position: relative;
	height: 750px;
	overflow: scroll;
	margin-top: 20px;
	.el-row{
		margin-bottom: 20px;
	}
	.block{
		position: absolute;
		margin-left: 25%;
	}
}
</style>