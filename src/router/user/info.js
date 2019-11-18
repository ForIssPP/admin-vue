import routerFactory from '@/utils/router-factory';


export default [
  ...routerFactory(
    'userController',
    () => import('@/views/users/user-controller/index'),
    'userController',
    '用户详情'
  )
]
