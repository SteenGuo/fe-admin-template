<!-- sideBar.vue -->
<template>
  <div class="side-bar">
    <el-scrollbar class="side-bar-wrap">
      <el-menu
        v-if="menuData.length > 0"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        :collapse="collapse"
        @select="handleSelect"
      >
        <el-submenu
          v-for="(item, index) in menuData"
          :key="`menu-${index}`"
          :index="`menu-${index}`"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.nameCn }}</span>
          </template>

          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="`menu-${index}-${subIndex}`"
            :index="String(subItem.id) || ''"
          >
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">{{ subItem.nameCn }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
    <!-- <div class="btn-wrap">
      <div class="btn-group" v-if="!collapse">
        <div class="btn-plain btn-add">
          <i class="el-icon-plus"></i>
          <span>添加部门</span>
        </div>
        <div class="btn-plain btn-add">
          <i class="el-icon-plus"></i>
          <span>添加人员</span>
        </div>
      </div>
      <div v-else class="btn-group">
        <div class="btn-inner-wrap">
          <div class="btn-icon add-department"></div>
        </div>
        <div class="btn-inner-wrap">
          <div class="btn-icon add-member"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { assign, map } from "lodash";
import { treeInfo, treeChild } from "@/api/department";

export default {
  name: "sideBar",
  components: {},
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuData: [
        // {
        //   id: 586,
        //   ddId: "1",
        //   nameCn: "复星通内测小组",
        //   nameEn: null,
        //   parentId: 0,
        //   parentDdid: "null",
        //   idPath: "/586",
        //   ddidPath: "/1",
        //   namePath: "/复星通内测小组",
        //   sort: 0,
        //   onlyCode: null,
        //   children: [
        //     {
        //       id: 586,
        //       ddId: "1",
        //       nameCn: "复星通内测小组",
        //       nameEn: null,
        //       parentId: 0,
        //       parentDdid: "null",
        //       idPath: "/586",
        //       ddidPath: "/1",
        //       namePath: "/复星通内测小组",
        //       sort: 0,
        //       onlyCode: null
        //     }
        //   ]
        // }
      ]
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.initMenu();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    initMenu() {
      treeInfo().then(res => {
        this.menuData = map(res, item => assign(item, { children: [] }));
        this.menuData.forEach(item => {
          treeChild(item.id).then(response => {
            item.children = response;
          });
        });
      });
    },
    handleSelect(index) {
      this.$router.push({
        name: "department",
        params: { id: index }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.side-bar {
  width: 100%;
  height: 100%;
  .side-bar-wrap {
    width: 100%;
    height: 100%;
  }
  .btn-wrap {
    width: 100%;
    height: 120px;
    .btn-group {
      width: 100%;
      height: 100%;
      color: $color-minor;
      font-size: 22px;
      cursor: pointer;
      overflow: hidden;
      @include flex;
      flex-direction: column;
      .btn-add {
        padding: 10px 30px;
      }
    }
    .btn-inner-wrap {
      width: 100%;
      height: 56px;
      @include flex;
      &:hover {
        background-color: rgb(38, 52, 69);
      }
    }
    .btn-icon {
      width: 20px;
      height: 20px;
      color: $color-minor;
      opacity: 0.5;
      cursor: pointer;
      &.add-department {
        background: url("~@/assets/images/new-department.svg") no-repeat
          center/contain;
      }
      &.add-member {
        background: url("~@/assets/images/new-member.svg") no-repeat
          center/contain;
      }
      & + .btn-icon {
        margin-top: 20px;
      }
    }
  }
}
</style>
