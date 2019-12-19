<!-- MainWrap.vue -->
<template>
  <div class="MainWrap">
    <el-tabs v-model="tabs.active" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in tabs.info"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <div class="main-container">
          <div class="main-container-wrap">
            <el-scrollbar class="main-container-inner">
              <div class="main-content">
                <component :is="item.route.name" :tab="item"></component>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Home from "@/views/homePage/Index.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "MainWrap",
  components: {
    department: () =>
      import(
        /* webpackChunkName: "department" */ "@/views/department/Index.vue"
      ),
    Home
  },
  data() {
    return {
      editableTabsValue: "部门二",
      editableTabs: [
        {
          title: "部门一",
          name: "部门一",
          elName: "Department",
          id: 1,
          content: "department"
        },
        {
          title: "2",
          name: "部门二",
          id: 2,
          elName: "",
          content: ""
        }
      ],
      tabIndex: 2
    };
  },
  computed: {
    ...mapState({
      tabs: state => state.layout.tabs
    }),
    ...mapGetters(["routeFromTab"])
  },
  watch: {
    //切换tab时 路由跟随跳转
    "tabs.active": function() {
      this.$router.replace(this.routeFromTab);
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.initTabsActive();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    addTab() {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: newTabName,
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      this.$store.commit("tabDelete", targetName);
    },
    initTabsActive() {
      let _routeName = this.$route.name;
      let _paramId = this.$route.params.id;
      let _tabName = _paramId ? `${_routeName}-${_paramId}` : _routeName;
      this.$store.commit("setTabsActive", _tabName);
    }
  }
};
</script>

<style scoped lang="scss">
.MainWrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .main-container {
    width: 100%;
    height: 100%;
    // height: $main-height;
    overflow: hidden;
    .main-container-wrap {
      width: 100%;
      height: 100%;
      .main-container-inner {
        width: 100%;
        height: 100%;
        .main-content {
          height: $main-height;
          padding: 0 20px;
          & > div,
          & > section {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
