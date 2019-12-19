import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/assets/js/auth";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  role: null
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { role, tk } = response;
          commit("SET_TOKEN", tk);
          setToken(tk);
          commit("SET_ROLE", role);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          // const { data } = response;
          // if (!data) {
          //   reject("Verification failed, please Login again.");
          // }
          // const { role, name, avatar } = data;
          // if (!role) {
          //   reject("getInfo: roles must be a non-null array!");
          // }
          // commit("SET_ROLES", roles);
          // commit("SET_NAME", name);
          // commit("SET_AVATAR", avatar);
          // resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_NAME", "");
          commit("SET_AVATAR", "");
          commit("SET_ROLES", []);
          removeToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
