<!-- Department.vue -->
<template>
  <div class="department">
    <div class="table-wrap" v-if="memberData.length > 0 || dpmData.length == 0">
      <div class="head-wrap">
        <div class="title">成员列表</div>
        <el-button type="primary" size="medium " icon="el-icon-plus">
          添加
        </el-button>
      </div>
      <el-table :data="memberData" stripe border style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="position" label="职位" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话号码" align="center">
        </el-table-column>
        <el-table-column prop="number" label="工号" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-wrap" v-if="dpmData.length > 0">
      <div class="head-wrap">
        <div class="title">部门列表</div>
        <el-button
          v-if="memberData.length == 0"
          type="primary"
          size="medium "
          icon="el-icon-plus"
        >
          添加
        </el-button>
      </div>
      <el-table
        :data="dpmData"
        row-key="id"
        stripe
        border
        lazy
        :load="load"
        @cell-click="tableClick"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          prop="nameCn"
          label="中文名称"
          :formatter="tableFormat"
        >
        </el-table-column>
        <el-table-column
          prop="nameEn"
          label="英文名称"
          align="center"
          :formatter="tableFormat"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          align="center"
          :formatter="tableFormat"
        >
        </el-table-column>
        <el-table-column
          prop="ddId"
          label="ddId"
          align="center"
          :formatter="tableFormat"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { map, assign } from "lodash";
import { dpmInfo, treeChild } from "@/api/department";
import mixins from "@/mixins";

export default {
  name: "department",
  mixins: [mixins],
  components: {},
  props: {
    tab: Object
  },
  data() {
    return {
      memberData: [],
      dpmData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          position: "前端开发工程师",
          email: "8888888@qq.com",
          phoneNum: "18888888888",
          number: "2365486454",
          hasChildren: true
        }
      ]
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.pageInit();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    pageInit() {
      let id = this.tab.route.params.id;
      dpmInfo(id).then(res => {
        this.$store.commit("setTabsTitle", {
          name: this.tab.name,
          title: res.nameCn
        });
      });
      treeChild(id).then(res => {
        this.dpmData = map(res, item => assign(item, { hasChildren: true }));
      });
    },
    load(row, treeNode, resolve) {
      treeChild(row.id).then(res => {
        resolve(map(res, item => assign(item, { hasChildren: true })));
      });
    },
    tableClick(row, column, cell, event) {
      console.log(row);
    }
  }
};
</script>

<style scoped lang="scss">
.department {
  width: 100%;
}
</style>
