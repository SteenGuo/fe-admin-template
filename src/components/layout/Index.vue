<!-- Layout.vue -->
<template>
  <div class="layout">
    <div class="layout-aside">
      <side-bar :collapse="isCollapse"></side-bar>
    </div>

    <el-container class="layout-container">
      <el-header>
        <head-bar v-model="isCollapse"></head-bar>
      </el-header>
      <el-main>
        <main-wrap></main-wrap>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import HeadBar from "./HeadBar";
import MainWrap from "./MainWrap";
export default {
  name: "layout",
  components: { SideBar, HeadBar, MainWrap },
  data() {
    return {
      isCollapse: false
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
  methods: {}
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .layout-aside {
    height: 100%;
    flex-shrink: 0;
    background-color: $color-aside;
    overflow: hidden;
  }
  .layout-container {
    height: 100%;
  }
}
</style>
