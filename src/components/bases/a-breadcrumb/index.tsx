import { Breadcrumb } from 'antd'
import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { RouteType } from '@/types/routes'
import { ConnectStateType } from '@/types/store'
import { dfs } from '@/utils'

type breadcrumbProps = {
  name: string
  path: string
}

// 不显示面包屑的列表
const BLACK_CODE = Object.freeze(['home', 'error', 'login'])

const ABreadcrumb: React.FC = () => {
  // 路径
  const { pathname } = useLocation()

  // 路由列表
  const routerList = useSelector(
    (state: ConnectStateType) => state.common.routerList
  )

  // 当前面包屑
  const breadcrumbList = useMemo(() => {
    const currentCode: string = pathname.replace(/\//g, '-').slice(1)
    const list: breadcrumbProps[] = []
    for (let i = 0; i < routerList.length; i++) {
      const tree = routerList[i]
      dfs(tree, (item: RouteType) => {
        const { name, code, path, redirect } = item
        if (
          !BLACK_CODE.includes(code) &&
          path !== '/' &&
          (code === currentCode || currentCode.indexOf(code) > -1)
        ) {
          list.push({
            name,
            path: redirect || path
          })
        }
      })
    }
    return list
  }, [pathname, routerList])

  return (
    <Breadcrumb>
      {breadcrumbList.map(item => (
        <Breadcrumb.Item key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default memo(ABreadcrumb)
