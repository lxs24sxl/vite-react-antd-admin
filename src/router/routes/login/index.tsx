import React from 'react'
import { RouteType } from '@/types/routes'

const Login = React.lazy(() => import('@/views/login/index'))

const list: RouteType[] = [
  {
    path: '/login',
    code: 'login',
    name: '首页',
    component: <Login />,
    isHidden: true
  }
]

export default list
