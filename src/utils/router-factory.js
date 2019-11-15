/**
 * 创建router工厂函数
 * @param {string|Array<string>} path 路径
 * @param {string|Array<string>} component 组件地址
 * @param {string|Array<string>} name 路由名称
 * @param {string|Array<string>} title 路由标题
 */
export default function (path, component, name, title) {
  const len = path.length;
  if (len) {
    let reList = [];
    for (let i = 0; i < len; i++) {
      reList.push({
        path: path[i],
        component: component[i],
        name: name[i],
        meta: {
          title: title[i]
        }
      })
    }
    return reList;
  } else {
    return [{
      path,
      component,
      name,
      meta: {
        title
      }
    }];
  }
}
