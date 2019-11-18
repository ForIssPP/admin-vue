import routerFactory from '@/utils/router-factory'

const name = ['addUser'];

export default [
  ...routerFactory(
    'addUser',
    () => import('@/views/users/create-user'),
    'addUser',
    '添加用户'
  )
]
