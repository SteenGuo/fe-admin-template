<!-- Index.vue -->
<template>
  <div class="Login">
    <div class="form-wrap">
      <div class="form-title">会务管理系统</div>
      <el-form
        class="login-form"
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item prop="username">
          <div class="input-icon username"></div>
          <el-input
            class="form-input"
            type="text"
            v-model="form.username"
            placeholder="账户"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <div class="input-icon password"></div>
          <el-input
            class="form-input"
            type="password"
            v-model="form.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="btn-download"
        type="primary"
        :loading="btnLoading"
        @click="handleLogin"
        >登 录</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      btnLoading: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.form).then(() => {
            let path = this.$route.query.redirect;
            this.$router.replace(path);
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.Login {
  width: 100%;
  height: 100%;
  background-color: $color-aside;
  @include flex;
  .form-wrap {
    width: 400px;
    padding: 40px;
    background-color: #fff;
    @include radius;
    .form-title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn-download {
      width: 100%;
    }
  }
}
</style>
