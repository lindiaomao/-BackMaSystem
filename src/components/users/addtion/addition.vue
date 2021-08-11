<template>
  <el-dialog
    :title="this.forEdit ? '编辑用户' : '添加用户'"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="is_not"
    align="left"
    opened="opendialog"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!editList.id">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="email"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          type="phone"
          v-model="ruleForm.mobile"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="reset_add">取 消</el-button>
      <el-button type="primary" @click="is_add">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { reqAddUser, reqEdit } from "../../../network/api";
export default {
  props: ["editList"],
  data() {
    return {
      is_not: false,
      dialogVisible: false,
      ruleForm: {
        username: "",
        email: "",
        mobile: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击确定
    is_add() {
      this.$refs.ruleForm.validate(async (vaild) => {
        if (vaild) {
          // 判断是否来自编辑
          if (!this.forEdit) {
            //   来自添加
            const res = await reqAddUser(this.ruleForm);
            console.log(res);
            if (res.meta.status == 201) {
              this.dialogVisible = false;
              this.reset();
              this.$message.success(res.meta.msg);
            } else {
              this.dialogVisible = false;
            }
          } else {
            //   来自编辑
            let { id } = this.editList;
            let { email, mobile } = this.ruleForm;
            const is_edit = await reqEdit(id, { email, mobile });
            console.log(is_edit);
          }
          this.handleClose();
        } else {
          return alert("请输入正确信息");
        }
      });
    },
    // 点击取消
    reset_add() {
      this.handleClose();
    },
    // 点击xx
    handleClose() {
      this.reset();
      this.$emit("cleareditList");
      this.dialogVisible = false;
    },
    reset() {
      this.$refs.ruleForm.resetFields();
    },
  },
  computed: {
    forEdit() {
      const { id, username } = this.editList;
      return !!id || username;
    },
  },
  watch: {
    editList(val) {
      let { username, mobile, email } = val;
      this.ruleForm = { username, email, mobile, password: "" };
    },
  },
};
</script>

<style>
</style>