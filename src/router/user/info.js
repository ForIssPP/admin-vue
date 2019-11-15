import routerFactory from '@/utils/router-factory';

const name = ['userinfoController'];

export default [
  ...routerFactory(
    name,
    [() => import('@/views/nested/menu1/menu1-1')],
    name,
    ['用户详情']
  )
]
