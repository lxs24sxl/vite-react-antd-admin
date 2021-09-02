import React from 'react'
import { BarChartOutlined } from '@ant-design/icons'
import { RouteType } from '@/types/routes'

const Home = React.lazy(() => import('@/views/home/index'))

const list: RouteType[] = [
  {
    path: '/home',
    code: 'home',
    name: '首页',
    component: <Home />,
    icon: <BarChartOutlined />
  }
]

export default list
