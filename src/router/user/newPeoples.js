import routerFactory from '@/utils/router-factory'

const name = ['addUser'];

export default [
  ...routerFactory(
    'addUser',
    () => import('@/views/users/create-user/index'),
    'addUser',
    '添加用户'
  )
]
