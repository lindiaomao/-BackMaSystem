<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <!-- 搜索添加用户 -->
      <el-row class="search-add">
        <el-col :span="8">
          <el-input
            v-model="userInfo.query"
            class="input-with-select"
            placeholder="请输入内容"
            clearable
            @change="this.getUsersList"
          >
            <el-button
              slot="append"
              :disabled="userInfo.query == '' ? true : false"
              icon="el-icon-search"
              circle
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="to_add">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 内容区 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="150"
        ></el-table-column>
        <el-table-column prop="role_name" label="用户身份"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="150"
        ></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="muserState(scope.row.id, $event)"
              active-color="#13ce66"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="danger"
              size="small"
              >删除</el-button
            >
            <el-button type="primary" size="small" @click="edit_user(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="assign_roles(scope.row)"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-form>
    <addition
      ref="dialog"
      @cleareditList="cleareditList"
      :editList="editList"
    ></addition>
    <assign-roles
      :rolesList="rolesList"
      :rolesInfo="rolesInfo"
      ref="rolesRefs"
    ></assign-roles>
  </div>
</template>

<script>
import {
  reqUsers,
  reqUserState,
  reqDeletUser,
  reqUserRoles,
} from "../../network/api";
import addition from "../users/addtion/addition.vue";
import assignRoles from "./assignRroles/assignRoles.vue";
export default {
  components: { addition, assignRoles },
  data() {
    return {
      userInfo: {
        query: "", //查询参数
        pagenum: 1, //当前页码
        pagesize: 5, //每页显示条数
      },
      userList: [], //用户数据
      total: 0, //总数据列表
      value: "", //双向绑定搜索框内容
      currentPage: 1, //当前页
      dialog: false, //弹窗是否弹出
      editList: {}, //编辑该用户信息
      rolesList: {}, //用户角色列表
      rolesInfo: {}, //用户角色信息
    };
  },
  create() {},
  mounted() {
    this.getUsersList();
    this.getUserRoles();
  },
  methods: {
    //   点击分配角色
    assign_roles(val) {
      this.rolesInfo = val;
      this.$refs.rolesRefs.dialogVisible = true;
      console.log(val);
    },
    //   获取用户角色列表
    async getUserRoles() {
      const roles = await reqUserRoles();
      if (roles.meta.status == 200) {
        this.rolesList = roles.data;
      }
    },
    //   用户
    cleareditList() {
      this.editList = {};
      this.getUsersList();
    },
    //   编辑用户
    edit_user(val) {
      this.editList = val;
      this.$refs.dialog.dialogVisible = true;
    },
    //   点击添加用户
    to_add() {
      this.$refs.dialog.dialogVisible = true;
    },
    // 点击每页有几条数据
    handleSizeChange(val) {
      this.userInfo.pagesize = val;
      this.getUsersList();
    },
    // 点击第几页
    handleCurrentChange(val) {
      this.userInfo.pagenum = val;
      this.getUsersList();
    },
    // 修改用户状态
    async muserState(id, state) {
      const u_state = await reqUserState(id, state);
      if (u_state.meta.status == 200) {
        this.getUsersList();
        return this.$message.success(u_state.meta.msg);
      } else {
        return this.$message.error(u_state.meta.msg);
      }
    },
    // 获取用户列表
    async getUsersList() {
      this;
      const res = await reqUsers(this.userInfo);
      if (res.meta.status == 200) {
        this.userList = res.data.users;
        this.total = res.data.total;
      } else {
        return this.$message.error(res.meta.msg);
      }
    },
    async handleClick(row) {
      const del = await reqDeletUser(row.id);
      if (del.meta.status == 200) {
        this.$message.success(del.meta.msg);
      } else {
        return;
      }
      this.getUsersList();
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  height: 100%;
  width: 95%;
  margin: auto;
  .el-breadcrumb {
    margin-bottom: 50px;
    .el-breadcrumb__item {
      font-size: 18px;
    }
  }
  .el-form {
    padding: 20px;
    background-color: #fff;
    .el-table {
      margin-bottom: 50px;
    }
  }
  .search-add {
    margin-bottom: 20px;
  }
}
</style>