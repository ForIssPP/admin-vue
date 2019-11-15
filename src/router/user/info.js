import routerFactory from '@/utils/router-factory';

const name = ['userinfoMen', 'userinfoWomen'];

export default [
  ...routerFactory(
    name,
    [() => import('@/views/nested/menu1/menu1-1'), () => import('@/views/nested/menu1/menu1-1')],
    name,
    ['用户详情-男', '用户详情-女']
  )
]
