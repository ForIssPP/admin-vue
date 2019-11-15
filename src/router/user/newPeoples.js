import routerFactory from '@/utils/router-factory'

const name = ['addUser'];

export default [
  ...routerFactory(
    name,
    [() => import('@/views/nested/menu1/menu1-1')],
    name,
    ['添加用户']
  )
]
