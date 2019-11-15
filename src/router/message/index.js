import routerFactory from '@/utils/router-factory';
import Layout from '@/layout'

const name = ['msgPush', 'feedback', 'tipOffs'];

export default {
  path: '/message',
  component: Layout,
  redirect: '/message',
  name: 'messageController',
  meta: {
    title: '消息管理',
    icon: 'message'
  },
  children: [
    ...routerFactory(
      name,
      Array(name.length).fill(() => import('@/views/nested/menu1/menu1-1')),
      name,
      ['消息推送', '反馈', '举报']
    )
  ]
}
