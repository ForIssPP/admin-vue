import info from './info'
import newPeoples from './newPeoples'
import check from './check'
import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user',
  name: 'User Controller',
  meta: {
    title: '用户管理',
    icon: 'peoples'
  },
  children: [
    ...check,
    ...info,
    ...newPeoples
  ]
}
