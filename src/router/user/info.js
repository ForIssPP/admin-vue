import routerFactory from '@/utils/router-factory';


export default [
  ...routerFactory(
    'userController',
    () => import('@/views/users/user-controller'),
    'userController',
    '用户详情'
  )
]
