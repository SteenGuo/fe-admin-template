import http from "@/assets/js/axiosWrap";

export function login(data) {
  return http({
    url: "/system/login",
    method: "get",
    params: data
  });
}

export function getInfo(token) {
  return http({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return http({
    url: "/user/logout",
    method: "post"
  });
}
