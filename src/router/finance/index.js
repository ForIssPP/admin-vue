import routerFactory from '@/utils/router-factory';
import Layout from '@/layout'

const name = ['recharge', 'cashRecord', 'purchaseRecord'];

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance',
  name: 'FinanceController',
  meta: {
    title: '财务管理',
    icon: 'money'
  },
  children: [
    ...routerFactory(
      name,
      Array(name.length).fill(() => import('@/views/nested/menu1/menu1-1')),
      name,
      ['手动充值', '提现记录', '消费记录']
    )
  ]
}
