import { Message } from "element-ui";

const TokenKey = "UUC_auth";

/**
 * 获取token
 */
function getToken() {
  let auth = localStorage.getItem(TokenKey);
  if (!auth) return undefined;

  let authObj = JSON.parse(auth);
  if (authObj.expires > new Date().getTime()) {
    return authObj.token;
  } else {
    Message.error("请重新登录！");
    removeToken();
    return undefined;
  }
}

/**
 * 设置token
 * @param {String} token
 */
function setToken(token) {
  let expires = new Date().getTime() + 23 * 60 * 60 * 1000;
  let _auth = { token, expires };
  return localStorage.setItem(TokenKey, JSON.stringify(_auth));
}

/**
 * 删除token
 */
function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export { getToken, setToken, removeToken };
