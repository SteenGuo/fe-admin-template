<!-- Home.vue -->
<template>
  <div class="Home">
    <div class="btn-wrap">
      <el-button type="primary" icon="el-icon-plus" @click="openForm('Dpm')"
        >添加部门</el-button
      >
      <el-button type="success" icon="el-icon-plus" @click="openForm('Mem')"
        >添加成员</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  props: {
    tab: Object
  },
  data() {
    return {};
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
    openForm(type) {
      this.$store.commit(`set${type}Visible`, true);
    }
  }
};
</script>

<style scoped lang="scss">
.Home {
  width: 100%;
  margin-top: -20px;
  @include flex;
  .btn-wrap {
    @include flex(flex-start);
    align-items: flex-start;
    .el-button {
      width: 200px;
      height: 160px;
      font-size: 22px;
    }
    .el-button + .el-button {
      margin-left: 50px;
    }
  }
}
</style>
