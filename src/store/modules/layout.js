import { Message } from "element-ui";
import { find } from "lodash";

//tab标题的长度
const TITLE_LENGTH = 7;

const state = {
  // 添加部门表单开关
  dpmVisible: false,
  memVisible: false,
  breadcrumb: [{ name: "首页", to: { name: "home" } }],
  tabs: {
    active: "home",
    info: [
      // {
      //   title: "首页",
      //   name: "home",
      //   route: {
      //     name: "home",
      //     params: { id: 1 },
      //     query: { num: 1 }
      //   }
      // }
    ]
  }
};
const getters = {
  routeFromTab: state => {
    let _tab = find(state.tabs.info, tab => tab.name == state.tabs.active);
    return _tab.route;
  }
};
const mutations = {
  setTabsActive(state, tabName) {
    state.tabs.active = tabName;
  },
  // 设置tab标题
  setTabsTitle(state, payload) {
    let tabsArr = state.tabs.info;
    tabsArr.forEach((item, index) => {
      if (item.name == payload.name) {
        let title =
          payload.title.length > TITLE_LENGTH
            ? payload.title.substring(0, TITLE_LENGTH) + "..."
            : payload.title;
        tabsArr[index].title = title;
      }
    });
  },
  // 添加tab
  tabAdd(state, tabObj) {
    tabObj.title =
      tabObj.title.length > TITLE_LENGTH
        ? tabObj.title.substring(0, TITLE_LENGTH) + "..."
        : tabObj.title;

    state.tabs.active = tabObj.name;
    let _tab = find(state.tabs.info, { name: tabObj.name });
    // 查看是否已经存在同名tab
    if (!_tab) {
      state.tabs.info.push(tabObj);
    } else {
      tabObj.title = _tab.title;
      state.tabs.info.forEach((item, index) => {
        if (item.name == tabObj.name) {
          state.tabs.info[index] = tabObj;
        }
      });
    }
  },
  //删除tab
  tabDelete(state, name) {
    let _arrIndex;
    let _active = state.tabs.active;
    let _tabs = state.tabs.info;
    _tabs.forEach((item, index) => {
      if (item.name == name) {
        _arrIndex = index;
      }
    });

    /*如果删除的是选中tab，分三种情况：
     *1 删除的是第一个tab，并且只有这一个tab，提示无法删除
     *2 删除的是最后一个tab，当前显示的tab变为他的前一个tab
     *3 删除其他tab时，当前显示的tab变为他的下一个tab
     */
    if (_active == name) {
      if (_arrIndex == 0 && _tabs.length == 1) {
        Message.error("无法关闭，至少保留一个标签！");
      } else if (_arrIndex == _tabs.length - 1) {
        state.tabs.active = _tabs[_tabs.length - 2].name;
        state.tabs.info = state.tabs.info.filter(tab => tab.name !== name);
      } else {
        state.tabs.active = _tabs[_arrIndex + 1].name;
        state.tabs.info = state.tabs.info.filter(tab => tab.name !== name);
      }
    } else {
      state.tabs.info = state.tabs.info.filter(tab => tab.name !== name);
    }
  },
  // 设置dpmVisible
  setDpmVisible(state, visible) {
    state.dpmVisible = visible;
  },
  // 设置memVisible
  setMemVisible(state, visible) {
    state.memVisible = visible;
  }
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
