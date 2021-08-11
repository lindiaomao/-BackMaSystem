<template>
  <el-dialog
    :title="forEdit ? '编辑角色' : '添加角色'"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          type="text"
          v-model="ruleForm.roleName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input
          type="text"
          v-model="ruleForm.roleDesc"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="isAddRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqAddRole,reqEditRole } from "../../../network/api";
export default {
  props: ["editval"],
  data() {
    return {
      dialogVisible: false, //是否显示
	  roleId:'',//角色id
      ruleForm: {
        roleName: "", //名称
        roleDesc: "", //描述
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "角色描述不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击确定
    isAddRole() {
      this.$refs.ruleForm.validate(async (valid) => {
        //   判断校验
        if (valid) {
			if(this.roleId){
				let {roleId:id} = this
				let {roleName,roleDesc} = this.ruleForm
				// 向后台请求数据
				const editval = await reqEditRole(id,{roleName,roleDesc})
				if(editval.meta.status == 200){
					this.$message.success(editval.meta.msg)
				}
			}else{
				// 当校验成功时执行
				const role = await reqAddRole(this.ruleForm);
				//   判断是否成功获取数据
				if (role.meta.status == 201) {
					//   请求数据
					this.$message.success(role.meta.msg);
				}
			}
          this.handleClose()
          //   重新获取数据
          this.$parent.getUserRoles();
        } else {
          // 校验不成功直接跳出
          return alert("请输入正确信息");
        }
      });
    },
    // 点击xx
    handleClose() {
      //   关闭dialog
      this.dialogVisible = false;
	  this.$emit("cleareditval")
      //   重置输入框
      this.$refs.ruleForm.resetFields();
    },
  },
  computed: {
	  forEdit(){
		  let {id} = this.editval
		  return !!id
	  }
  },
  watch: {
    editval(val) {
      let { roleName, roleDesc } = val;
	  this.roleId = val.id
      this.ruleForm = { roleName, roleDesc };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>