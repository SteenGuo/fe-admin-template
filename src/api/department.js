import http from "@/assets/js/axiosWrap";
import store from "@/store";

const token = store.state.user.token;

/**
 * 初始化授权部门列表
 */
export function treeInfo() {
  return http({
    url: "/department/treeinfo",
    method: "get",
    params: { tk: token }
  });
}

/**
 * 获取子部门列表
 * @param {String Number} id
 */
export function treeChild(id) {
  return http({
    url: `/department/child/${id}`,
    method: "get",
    params: { tk: token }
  });
}

/**
 * 部门详情
 * @param {String Number} id
 */
export function dpmInfo(id) {
  return http({
    url: `/department/info/${id}`,
    method: "post",
    params: { tk: token }
  });
}
