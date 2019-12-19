# fe-admin-template

服务器访问地址
http://172.102.130.56:8080/swagger-ui.html
超管账号  admin 123456

静态资源 - 前端页面访问地址
http://172.102.130.56:8080/web/123.html


服务器地址
root@172.102.130.56
9dmGa5`XmH,w5B+


说明：这个项目没有使用常规的router-view来显示页面，而是把页面当成了component来写，然后在layout的el-tabs中使用。使用动态加载component来减少js的引入。

tabs的name和路由是有关联的；在路由中动态添加tabs的内容,tabs的name等于 '路由名-$route.params.id',如果没有id就等于路由名,路由的name,params,query包含在tabs的route属性中。路由名和MainWrap中引入的components名必须一致，这点很重要。每个页面需要的路由信息，全部包含在props的tab.route对象中

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
