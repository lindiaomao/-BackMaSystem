<template>
  <div class="home">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../network/api";
export default {
  name: "Home",
  data() {
    return {
      ruleForm: {
        pass: "",
        name: "",
      },
      rules: {
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    //   点击提交
    async submitForm(formName) {
      let { pass, name } = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
      });
      const res = await login({ username: name, password: pass });
      if (res.meta.status == 200) {
        let token = res.data.token;
        sessionStorage.setItem("token", token);
        this.$router.push("/welcome");
      } else {
        alert(res.meta.msg);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  position: relative;
  width: 100%;
  height: 900px;
  justify-content: center;
  align-content: center;
  background-color: aqua;
  background: url("../img/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  .el-form {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 580px;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    background: url("../img/login_form_bg.jpg") no-repeat;
    background-size: 100% 100%;
    .el-form-item {
      margin-top: 40px;
    }
  }
}
</style>
