import React from 'react'
import { RouteType } from '@/types/routes'
// import Error from '@/views/error'

const ErrorPage = React.lazy(() => import('@/views/error'))

const list: RouteType[] = [
  {
    path: '/error',
    code: 'error',
    name: '错误页面',
    isHidden: true,
    component: <ErrorPage />
  }
]
export default list
