<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="50%"
  >
    <el-row>
      <el-col>当前用户是：{{ rolesInfo.username }}</el-col>
    </el-row>
    <el-row style="margin: 20px 0">
      <el-col>当前用户角色是：{{ rolesInfo.role_name }}</el-col>
    </el-row>
    <el-row>
      <el-col>
        分配角色
        <el-select v-model="roles" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
            >{{ item.roleName }}</el-option
          >
        </el-select>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="is_roles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqAssignRoles } from "../../../network/api";
export default {
  props: ["rolesInfo", "rolesList"],
  data() {
    return {
      roles: "",
      dialogVisible: false, //是否显示弹窗
    };
  },
  methods: {
    //   点击确实
    async is_roles() {
      let { id } = this.rolesInfo;
      if (!this.roles) {
        return this.$message.error("请选择角色");
      }
      const assignRole = await reqAssignRoles(id, this.roles);
      console.log(assignRole);
      if (assignRole.meta.status == 200) {
        this.$message.success(assignRole.meta.msg);
      }
      this.dialogVisible = false;
      this.$parent.getUsersList();
    },
    // 点击xx
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>