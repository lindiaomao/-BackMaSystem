<template>
  <div class="params">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-form>
        <el-form-item label="选择商品分类" align-left>
          <el-cascader v-model="value" :options="options" :props="cateProps" expandTrigger="hover" @change="handleChange"></el-cascader>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" v-model="sel.many" name="first">
              <el-row>
                <el-button type="primary">添加参数</el-button>
              </el-row>
              <el-table border :data="tableData" style="width: 100%">
                <el-table-column type="expand">
					<template >
						<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
							{{ tag }}
						</el-tag>
						<el-input
							class="input-new-tag"
							v-if="inputVisible"
							v-model="inputValue"
							ref="saveTagInput"
							size="small"
							@keyup.enter.native="handleInputConfirm"
							@blur="handleInputConfirm"
							>
						</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
					</template>
                  
                </el-table-column>
                <el-table-column type="index"> </el-table-column>
                <el-table-column prop="attr_name" label="参数名称">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" class="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
                    <el-button type="warning" class="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" v-model="sel.only" name="second">
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reqCategoriesList, reqCatParams } from "../../network/api";
export default {
  data() {
    return {
dynamicTags: [],
		// 是否显示输入框
	  inputVisible:false,
	  inputValue:'',//双向绑定输入框的值
      tableData: [], //动态参数绑定数据
      activeName: "first", //默认展开
      value: [],
      options: [], //数据绑定
      // 配置项
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      }, //配置项
      handID: "", //id
      sel: {
        only: "only",
        many: "many",
      },
    };
  },
  mounted() {
    this.getParamsList();
  },
  methods: {
	//   点击xx
	   handleClose(tag) {
		   console.log(this.dynamicTags.indexOf(tag));
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
	  //   点击输入按钮
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
	//   回车或者取消焦点
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    
    //   点击删除
    del(delVal) {
      console.log(delVal);
    },
    //   点击编辑
    edit(editval) {
      console.log(editval);
    },
    //   点击切换
    handleClick(e) {
      console.log(e);
    },
    //   点击级联选择器
    handleChange(e) {
      this.handID = e[2];
      this.getSelList();
    },
    //   获取级联选择器数据
    async getParamsList() {
      const paramsList = await reqCategoriesList();
      if (paramsList.meta.status == 200) {
        this.options = paramsList.data;
      } else {
        return this.$message.error(paramsList.meta.msg);
      }
      console.log(paramsList);
    },
    async getSelList() {
      let { handID } = this;
      let { many } = this.sel;
      const selVal = await reqCatParams(handID, many);
      if (selVal.meta.status == 200) {
        selVal.data.forEach((item) => {
          item.attr_vals = item.attr_vals.split(",");
		  this.dynamicTags = item.attr_vals
        });
        this.tableData = selVal.data;
		console.log(this.dynamicTags);
        console.log(selVal);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
  .el-form {
    margin: 20px 0;
    .el-table {
      margin-top: 20px;
      .el-tag + .el-tag {
        margin-left: 10px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
  }
}
</style>