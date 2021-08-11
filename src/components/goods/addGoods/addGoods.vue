<template>
  <div class="contain">
    <!-- 导航条 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
		<el-row>
			<el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
		</el-row>
		<el-row>
			<el-steps :active="active-0" align-center finish-status="success">
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
		</el-row>
		<el-row>
			<el-tabs tab-position="left" :before-leave="beforLeave" @tab-click="tabClick" ref="tabs" v-model="active">
				<el-tab-pane name="0" label="基本信息">
					<el-form :model="Form" :rules="rules" ref="Form" class="demo-ruleForm">
						<el-form-item label="商品名称" prop="goods_name" >
							<el-input type="text" v-model="Form.goods_name" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="商品价格" prop="goods_price" >
							<el-input v-model.number="Form.goods_price" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="商品重量" prop="goods_weight" >
							<el-input v-model.number="Form.goods_weight" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="商品数量" prop="goods_number" >
							<el-input v-model.number="Form.goods_number" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="商品分类" align-left prop="goods_cat">
							<el-cascader
							v-model="Form.goods_cat"
							:options="options"
							:props="cateProps"
							expandTrigger="hover"
							@change="handleChange"></el-cascader>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane name="1" label="商品参数">
					<el-form>
						<el-form-item :label='tag.attr_name' v-for="tag in tags" :key="tag.attr_id" block>
							<div style="margin-top: 50px">
								<el-checkbox-group v-model="manyData[0].attr_vals">
									<el-checkbox @change="handleClose(item)" :label="item" v-for="(item,index) in manyData[0].attr_vals" :key="index" border></el-checkbox>
								</el-checkbox-group>
							</div>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane name="2" label="商品属性">
					<el-form class="demo-ruleForm">
						<el-form-item :label="item.attr_name" v-for="item in onlyData" :key="item.attr_id">
							<el-input v-model="item.attr_vals"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane name="3" label="商品图片">
					<el-form>
						<!-- action表示图片要上传到的地址 -->
						<el-upload
							multiple
							class="upload-demo"
							:action="uploadURL"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:headers="headerObj"
							:on-success="handleSuccess"
							list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</el-form>
				</el-tab-pane>
				<el-tab-pane name="4" label="商品内容">
					<el-form>
						<div class="edit_container">
							<quill-editor 
								v-model="Form.goods_introduce" 
								ref="myQuillEditor" 
								:options="editorOption" >
							</quill-editor>
							
						</div> 
						<el-row>
							<el-button type="primary" @click="saveHtml">添加商品</el-button>
						</el-row>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-row>
    </el-card>
  </div>
</template>

<script>
// ,reqDelParams,reqUnpload
import {reqCategoriesList,reqCatParams,reqAddGoods} from '../../../network/api'
export default {
	data(){
		return{
			editorOption:{},//
			headerObj:{
				Authorization:window.sessionStorage.getItem('token')
			},// 上传图片请求头 必传
			uploadURL:'http://127.0.0.1:8888/api/private/v1/upload',//上传图片的路径 服务器的路径
			manyData:[],//商品参数
			onlyData:[],//商品属性
			tags:[],
			handId:'',//分类id
			value:'',
			// 分类参数
			sel:{
				only:"only",
				many:'many'
			},
			options:[],
			active:0,
			cateProps:{
				value:'cat_id',
				label:'cat_name',
				children:'children'
				},
			Form:{
				goods_name:'',
				goods_cat:'',
				goods_price:'',
				goods_number:'',
				goods_weight:'',
				goods_introduce:'',//文本信息
				pics:[],//图片路径
				attrs:[],//参数
			},
			rules:{
				goods_name:[
					{ required: true, message: '商品名称不能为空'},
				],
				goods_price:[
					{ required: true, message: '商品价格不能为空'},
					{ type:'number', message: '商品价格必须为数字'}
				],
				goods_weight:[
					{ required: true, message: '商品重量不能为空'},
					{ type:'number', message: '商品重量必须为数字'}
				],
				goods_number:[
					{ required: true, message: '商品数量不能为空'},
					{ type:'number', message: '商品数量必须为数字'}
				],
				goods_cat:[
					{ required: true, message: '选项不能为空'},
				]
			}
		}
	},
	mounted(){
		this.getCategories()
	},
	methods:{
		onEditorReady(editor) { // 准备编辑器
		console.log(editor);
        },
		// 添加商品
        saveHtml(){
		  		this.$refs.Form.validate(async valid =>{
			  if(!valid){
				  return this.$message.error("请完成所有项")
			  }else{
				  //   以为','分割的分类列表
				  this.Form.goods_cat = JSON.parse(JSON.stringify(this.Form.goods_cat)).join(',')
				//    处理动态参数
				this.manyData.forEach(item=>{
					const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals.join(',')}
					this.Form.attrs.push(newInfo)
				})
				// 处理静态参数
				this.onlyData.forEach(item => {
					const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals}
					this.Form.attrs.push(newInfo)
				})
				  const {Form} = this
				  const addGoods = await reqAddGoods(Form)
				  if(addGoods.meta.status == 201){
					  this.$message.success(addGoods.meta.msg)
					  this.$router.push('/goods')
				  }else{
					  return this.$message.error(addGoods.meta.msg)
				  }
			  }
		  })
        },
		// 上传图片成功时的钩子函数
		async handleSuccess(response){
			// 拼接得到一个图片信息对象
			let picInfo = {pic:response.data.tmp_path}
			// 将图片信息对象，push到pics数组中
			this.Form.pics.push(picInfo)
		},
		// 移除图片事件
		handleRemove(file) {
			let filePath = file.response.data.tmp_path
			let index = this.Form.pics.findIndex(x => x.pics === filePath)
			this.Form.pics.splice(index,1)
		},
		//   处理图片预览效果
		handlePreview(file) {
			console.log('preview',file);
		},
		// 点击移除标签
		handleClose(tag){
			console.log(tag);
		},
		// 监听切换标签
		beforLeave(activeName, oldActiveName){
			let {goods_cat} = this.Form
			if(oldActiveName === '0' && goods_cat.length !== 3){
				 this.$message.error('请完成基本信息')
				 return false
			}
		},
		// 点击切换标签
		async tabClick(e){
			if(e.index == '1'){
				let {handId} = this
				let {many} = this.sel
				const actVal = await reqCatParams(handId,many)
				if(actVal.meta.status == 200){
					this.tags = actVal.data
					if(actVal.data.length !== 0){
						// 赋值
						// 以空格分割数组 trim()去掉两边空格
						actVal.data[0].attr_vals=actVal.data[0].attr_vals.trim().split(" ")
						// 将分割后的数组赋值
						this.manyData = actVal.data
					}
				}else{
					this.$message.error(actVal.meta.msg)
				}
			}else if(e.index == '2'){
				let {handId} = this
				let {only} = this.sel
				const actVal = await reqCatParams(handId,only)
				this.onlyData = actVal.data
			}else{
				return
			}
		},
		//点击联机选择器
		handleChange(e){
			if(this.Form.goods_cat.length !== 3){
				this.Form.goods_cat = []
			}
			this.handId = e[2]
		},
		// 获取数据
		async getCategories(){
			const categories = await reqCategoriesList()
			if(categories.meta.status == 200){
				this.options = categories.data
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.contain {
  .el-card {
	//   height: 750px;
	  overflow: scroll;
    	margin-top: 20px;
	.el-alert{
		margin-bottom: 20px;
	}
	.el-steps{
		margin-bottom: 15px;
	}
	.el-tabs{
		.el-form{
			height: 600px;
			overflow: scroll;
			.quill-editor{
				height: 400px;
			}
			.edit_container{
				width: 100%;
				height: 90%;
				.ql-container {
					height: 400px;
				}
			}
		}
		.el-tab-pane{
			.el-tag{
				float: left;
				margin: 10px;
			}
		}
	}
  }
}
</style>