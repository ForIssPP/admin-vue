import routerFactory from '@/utils/router-factory';


export default [
  ...routerFactory(
    'userController',
    () => import('@/views/nested/menu1/menu1-1'),
    'userController',
    '用户详情'
  )
]
