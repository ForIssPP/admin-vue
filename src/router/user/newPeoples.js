import routerFactory from '@/utils/router-factory'

const name = ['addMen', 'addWomen'];

export default [
  ...routerFactory(
    name,
    [() => import('@/views/nested/menu1/menu1-1'), () => import('@/views/nested/menu1/menu1-1')],
    name,
    ['添加用户-男', '添加用户-女']
  )
]
