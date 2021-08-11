<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-row class="ad">
        <el-col :span="4">
          <el-button type="primary" @click="to_add">添加角色</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" border style="width: 100%; height: 700px">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row
                class="roleItem"
                v-for="item in props.row.children"
                :key="item.id"
              >
                <!-- 一级权限 -->
                <el-col :span="8">
                  <el-tag type="" closable>
                    {{ item.authName }}
                  </el-tag>
                </el-col>
                <!-- 二级权限-->
                <el-col :span="16">
                  <el-row
                    class="seconditem"
                    v-for="item1 in item.children"
                    :key="item1.id"
                  >
                    <el-col :span="4">
                      <el-tag type="success" closable>
                        {{ item1.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col class="latst" :span="20">
                      <span v-for="item2 in item1.children" :key="item2.id">
                        <el-tag
                          type="warning"
                          closable
                          @close="handleClose(item2)"
                        >
                          {{ item2.authName }}
                        </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label=""></el-table-column>
          <el-table-column label="角色名称" prop="roleName"> </el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="el-icon-edit"
                size="small"
                @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                class="el-icon-delete"
                size="small"
                @click="del(scope.row)"
                >删除</el-button
              >
              <el-button
                type="warning"
                class="el-icon-setting"
                size="small"
                @click="assignment(scope.row)"
                >分配角色</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>

    <!-- 角色分配 -->
    <roles-assign ref="dialog" :asval="asval"></roles-assign>
    <!-- 添加角色 -->
    <add-role
      ref="addDialog"
      :editval="editval"
      @cleareditval="cleareditval"
    ></add-role>
  </div>
</template>

<script>
import { reqUserRoles, reqDelRole } from "../../network/api";
import AddRole from "./addRole/addRole.vue";
import rolesAssign from "./rolesAssign/rolesAssign.vue";
export default {
  components: { rolesAssign, AddRole },
  data() {
    return {
      tableData: [], //用户列表
      asval: {}, //分配角色数据
      editval: {}, //编辑角色
    };
  },
  create() {},
  mounted() {
    this.getUserRoles();
  },
  methods: {
    //   点击添加角色
    to_add() {
      this.$refs.addDialog.dialogVisible = true;
    },
    //   点击删除标签
    handleClose(tag) {
      console.log(tag);
    },
    cleareditval() {
      this.editval = {};
    },
    //   点击编辑
    edit(editval) {
      console.log("编辑", editval);
      this.editval = editval;
      this.$refs.addDialog.dialogVisible = true;
    },
    //   点击删除
    async del(delval) {
      const del = await reqDelRole(delval.id);
      if (del.meta.status == 200) {
        this.$message.success(del.meta.msg);
        this.getUserRoles();
      }
    },
    // 点击分配角色
    assignment(asval) {
      console.log("分配角色", asval);
      this.asval = asval;
      this.$refs.dialog.getRolesList();
      this.$refs.dialog.dialogVisible = true;
    },
    // 获取角色列表
    async getUserRoles() {
      const rolesval = await reqUserRoles();
      console.log(rolesval);
      this.tableData = rolesval.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  height: 100%;
  width: 95%;
  margin: auto;
  .ad {
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
    padding-bottom: 20px;
    .el-button {
      margin-top: 20px;
    }
  }

  .el-table {
    margin-top: 0 20px;
    overflow: scroll;
    .roleItem {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .seconditem {
        display: block;
        margin: 10px 0;
        border-bottom: 1px solid #ccc;
        padding: 5px;
        .latst {
          display: flex;
          flex-wrap: wrap;
          .el-tag {
            margin: 0 10px 10px;
          }
        }
      }
    }
  }
}
</style>