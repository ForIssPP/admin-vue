import routerFactory from '@/utils/router-factory';
import Layout from '@/layout'

const name = ['activityCheck', 'offlinePartyCheck', 'onlinePartyCheck'];

export default {
  path: '/activity',
  component: Layout,
  redirect: '/activity',
  name: 'ActivityController',
  meta: {
    title: '广场动态',
    icon: 'component'
  },
  children: [
    ...routerFactory(
      name,
      Array(name.length).fill(() => import('@/views/nested/menu1/menu1-1')),
      name,
      ['动态审核', '线下聚会审核', '私密聚会审核']
    )
  ]
}
