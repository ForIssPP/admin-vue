import routerFactory from '@/utils/router-factory';

const name = ['nameCheck', 'avatarCheck', 'profilesCheck', 'albumCheck', 'userPictureCheck', 'moneyCheck'];

export default [
  ...routerFactory(
    name,
    [
      () => import('@/views/users/name-check/index'),
      () => import('@/views/users/avatar-check/index'),
      () => import('@/views/users/profiles-check/index'),
      ...Array(name.length - 3).fill(() => import('@/views/nested/menu1/menu1-1'))
    ],
    name,
    ['昵称审核', '头像审核', '个人介绍审核', '相册审核', '真人认证审核', '财产认证审核']
  )
]
