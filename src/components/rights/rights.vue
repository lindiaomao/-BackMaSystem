<template>
  <!-- <div>权限管理</div> -->
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%; height: 750px">
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="权限名称" prop="authName"> </el-table-column>
      <el-table-column label="路径" prop="path"> </el-table-column>
      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              size="mini"
              v-if="scope.row.level == 0"
              plain
              >一级</el-button
            >
            <el-button
              type="success"
              size="mini"
              v-else-if="scope.row.level == 1"
              plain
              >二级</el-button
            >
            <el-button plain size="mini" v-else-if="scope.row.level == 2"
              >三级</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqUserRights } from "../../network/api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getRights();
  },
  methods: {
    cli(e) {
      console.log(e);
    },
    // 获取权限列表
    async getRights() {
      const rights = await reqUserRights();
      console.log(rights);
      if (rights.meta.status == 200) {
        this.tableData = rights.data;
        this.$message.success(rights.meta.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  height: 100%;
  width: 95%;
  margin: auto;
  .el-table {
    margin-top: 20px;
    overflow: scroll;
  }
}
</style>