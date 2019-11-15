import routerFactory from '@/utils/router-factory'

const name = ['addUser'];

export default [
  ...routerFactory(
    'addUser',
    () => import('@/views/nested/menu1/menu1-1'),
    'addUser',
    '添加用户'
  )
]
