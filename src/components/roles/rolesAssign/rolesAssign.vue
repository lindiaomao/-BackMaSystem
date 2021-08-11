<template>
  <el-dialog
    title="分配角色"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="30%"
    center
  >
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="arrList"
      :props="defaultProps"
      ref="tree"
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
//
import { reqRolesAs, reqRolesReac } from "../../../network/api";
// function fun(ele,arr){
// 	if(!ele.children){
// 		return arr.push(ele.id)
// 	}
// 	ele.children.forEach(item => fun(item,arr));
// }
export default {
  props: ["asval"],
  data() {
    return {
      dialogVisible: false, //是否显示
      data: [],
      defaultProps: {
        label: "authName",
        children: "children",
      },
      arrList: [],
      role: {},
    };
  },
  created() {
    //   this.getRolesList()
  },
  methods: {
    //   点击确定
    async addRoles() {
      // 获取所有的全选id和半选id合并到一个数组
      // console.log(this.$refs.tree.getCheckedKeys());
      // console.log(this.$refs.tree.getHalfCheckedKeys());
      // let node = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      // 将对象转换成字符串
      let node = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ].join(",");
      let { id: roleId } = this.role;
      const role = await reqRolesReac(roleId, node);
      if (role.meta.status == 200) {
        this.$message.success(role.meta.msg);
        this.$parent.getUserRoles();
        this.handleClose();
      }
    },
    //   点击xx
    handleClose() {
      // 清空权限id
      this.arrList = [];
      this.dialogVisible = false;
    },
    // 获取角色列表
    async getRolesList() {
      const rolesList = await reqRolesAs();
      if (rolesList.meta.status == 200) {
        this.data = rolesList.data;
        //把当前的角色放到this.getcheckNodes中去递归循环，把得到的节点id放到arrList中
        this.getCheckNodes(this.role, this.arrList);
      }
    },
    getCheckNodes(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      //递归
      node.children.forEach((item) => this.getCheckNodes(item, arr));
    },
  },
  watch: {
    //   将父组件传过来的值赋值个this.role
    asval(e) {
      this.role = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tree {
  height: 600px;
  overflow: scroll;
}
</style>