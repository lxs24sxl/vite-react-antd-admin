// import UserList from '@/views/user/user-list'
// import UserCreate from '@/views/user/user-create'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { RouteType } from '@/types/routes'

const UserCreate = React.lazy(() => import('@/views/user/user-create'))
const UserList = React.lazy(() => import('@/views/user/user-list'))

const list: RouteType[] = [
  {
    path: '/user',
    code: 'user',
    name: '用户管理',
    exact: true,
    redirect: '/user/list',
    icon: <UserOutlined />,
    children: [
      {
        path: '/user/list',
        code: 'user-list',
        name: '用户列表',
        component: <UserList />,
        exact: true
      },
      {
        path: '/user/create',
        code: 'user-create',
        name: '用户创建',
        component: <UserCreate />,
        exact: true
      }
    ]
  }
]

export default list
