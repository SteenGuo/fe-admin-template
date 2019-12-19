<!-- headBar.vue -->
<template>
  <div class="layout-header">
    <div class="layout-header-inner">
      <div class="menu-swich" @click="menuSwitch">
        <i class="el-icon-s-fold"></i>
      </div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
          :to="item.to"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-header-inner">
      <div class="btn-group-wrap">
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="search"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
      <div class="user-wrap">
        <div class="face"></div>
        <el-dropdown>
          <span class="user-setting">
            <span>admin</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="openForm('dpmForm')"
              >添加部门</el-dropdown-item
            >
            <el-dropdown-item @click.native="openForm('memForm')"
              >添加人员</el-dropdown-item
            >
            <el-dropdown-item>账户维护</el-dropdown-item>
            <el-dropdown-item>重置密码</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 添加部门 -->
    <el-dialog title="添加部门" :visible.sync="dpmFormVisible" width="500px">
      <el-form :model="dpmForm" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="dpmForm.nameCn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="dpmForm.nameEn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="dpmForm.department" placeholder="请选择所属部门">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dpmFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dpmFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加人员 -->
    <el-dialog title="添加人员" :visible.sync="memFormVisible" width="500px">
      <el-form :model="memForm" label-width="80px">
        <el-form-item label="中文名">
          <el-input v-model="memForm.nameCn"></el-input>
        </el-form-item>
        <el-form-item label="英文名">
          <el-input v-model="memForm.nameEn"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="memForm.jobNumber"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="dpmForm.department" placeholder="请选择所属部门">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="memForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="memForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dpmFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dpmFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "headBar",
  components: {},
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      dpmFormVisible: this.$store.state.layout.dpmVisible,
      memFormVisible: this.$store.state.layout.memVisible,
      isCollapse: this.value,
      search: "",
      dpmForm: { nameCn: "", nameEn: "", department: {} },
      memForm: {}
    };
  },
  computed: {
    ...mapState({
      breadcrumb: state => state.layout.breadcrumb,
      dpmVisible: state => state.layout.dpmVisible,
      memVisible: state => state.layout.memVisible
    })
  },
  watch: {
    isCollapse: function(val) {
      this.$emit("input", val);
    },
    dpmFormVisible: function(val) {
      this.$store.commit("setDpmVisible", val);
    },
    memFormVisible: function(val) {
      this.$store.commit("setMemVisible", val);
    },
    dpmVisible: function(val) {
      this.dpmFormVisible = val;
    },
    memVisible: function(val) {
      this.memFormVisible = val;
    }
  },
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
    menuSwitch() {
      this.isCollapse = !this.isCollapse;
    },
    openForm(_form) {
      this[`${_form}Visible`] = true;
    },
    closeForm(_form) {
      this[`${_form}Visible`] = false;
    }
  }
};
</script>

<style scoped lang="scss">
.layout-header {
  width: 100%;
  height: 100%;
  @include flex(space-between);
  .layout-header-inner {
    @include flex(flex-start);
    .menu-swich {
      height: 100%;
      font-size: 26px;
      margin-right: 20px;
      @include flex;
    }
    .btn-group-wrap {
    }
    .user-wrap {
      min-width: 120px;
      margin-left: 100px;
      @include flex(flex-start);
      .face {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: $color-minor;
        margin-right: 10px;
      }
      .user-setting {
        cursor: pointer;
      }
    }
  }
}
</style>
