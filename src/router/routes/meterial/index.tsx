// import MeterialList from '@/views/meterial/meterial-list'
// import MeterialCreate from '@/views/meterial/meterial-create'
import React from 'react'

import { ExperimentOutlined } from '@ant-design/icons'
import { RouteType } from '@/types/routes'

const MeterialList = React.lazy(() => import('@/views/meterial/meterial-list'))
const MeterialCreate = React.lazy(
  () => import('@/views/meterial/meterial-create')
)

const list: RouteType[] = [
  {
    path: '/meterial',
    code: 'meterial',
    name: '资源管理',
    exact: true,
    redirect: '/meterial/list',
    icon: <ExperimentOutlined />,
    children: [
      {
        path: '/meterial/list',
        code: 'meterial-list',
        name: '资源列表',
        component: <MeterialList />,
        exact: true
      },
      {
        path: '/meterial/create',
        code: 'meterial-create',
        name: '资源创建',
        component: <MeterialCreate />,
        // component: () => import('@/views/meterial/meterial-create'),
        exact: true
      }
    ]
  }
]

export default list
