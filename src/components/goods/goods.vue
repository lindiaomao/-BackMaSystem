<template>
  <div class="goods">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline">
        <!-- 搜索添加用户 -->
        <el-row class="search-add">
          <el-col :span="8">
            <el-input
              v-model="queryInfo.query"
              class="input-with-select"
              placeholder="请输入内容"
              clearable
			  @clear="getGoodsList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getGoodsList"
                circle
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </el-col>
        </el-row>
        <!-- 表格部分 -->
        <el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="" width="50">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="580">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格(元)">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量">
            </el-table-column>
            <el-table-column
              :formatter="formatDate"
              prop="add_time"
              label="创建时间"
              width="180"
            >
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  class="el-icon-edit"
                  size="mini"
                  @click="edit(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  class="el-icon-delete"
                  size="mini"
                  @click="del(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.currentPage"
              :page-sizes="[10, 15, 20, 30]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reqGoodsList,reqDelGoods } from "../../network/api";
export default {
  data() {
    return {
      tableData: [{ name: "" }],
      queryInfo: {
		  query:'',//搜索关键字
        pagesize: 10, //每页几条
        currentPage: 1, //当前页
      },
      total: 0, //总条数
      query: "", //搜索框数据
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
	//   点击添加商品
	addGoods(){
		this.$router.push('/addGoods')
	},
    //   删除
    async del(delval) {
		let del = await reqDelGoods(delval.goods_id)
		if(del.meta.status == 200){
			this.$message.success('删除成功')
			this.getGoodsList()
		}else{
			return this.$message.error(del.meta.msg);
		}
    },
    //   编辑
    edit(editval) {
      console.log(editval);
    },
    //   获取商品列表数据
    async getGoodsList() {
		let {query,currentPage,pagesize} = this.queryInfo
      let goodsVal = await reqGoodsList(query,currentPage,pagesize);
      if (goodsVal.meta.status == 200) {
        this.total = goodsVal.data.total;
        this.tableData = goodsVal.data.goods;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.currentPage = val;
      this.getGoodsList();
    },
  },
};
</script>

<style lang="scss" scoped>
.goods {
  margin: 0;

  .el-card {
    height: 750px;
    overflow: scroll;
    margin-top: 20px;
    .el-row {
      margin: 20px 0;
    }
  }
}
</style>