import React, { useCallback, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { ReactRouter } from '@/router'
import BasicLayout from '@/components/layout/basic-layout'
import routerList from '@/router/routerList'

import { SetRouterListAction, SetUserInfoAction } from './store/actions/common'
import { GetUserInfo } from './services/apis'
import { clearPending } from './services'
import { RouteType } from './types/routes'
import { dfs } from './utils'

const { VITE_APP_TITLE } = import.meta.env

const WHITE_LIST = Object.freeze(['/login'])

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { pathname } = location

  const initEvent = useCallback(async () => {
    const list = [GetUserInfo()]
    const [{ data: userInfo }] = await Promise.all(list)
    if (userInfo) {
      dispatch(SetUserInfoAction(userInfo as ObjectAnyType))
    }
  }, [dispatch])


  // 格式化路由列表
  const formatRouterList = useMemo(() => {
    return routerList.reduce((result: RouteType[], route: RouteType) => {
      if (route.children) {
        route.children.map(item => {
          if (item.children) {
            const childRoutes: RouteType[] = []
            item.children.forEach(it => {
              dfs(it, (tree: RouteType) => {
                childRoutes?.push({
                  ...tree,
                  children: []
                })
              })
            })
            item.children = []
            route.children?.push(...childRoutes)
          }
          return item
        })
      }
      result.push(route)
      return result
    }, [])
  }, [])

  useEffect(() => {
    dispatch(SetRouterListAction(formatRouterList))
  }, [dispatch, formatRouterList])

  useEffect(() => {
    initEvent()
    return () => {
      clearPending()
    }
  }, [initEvent])

  return (
    <>
      {WHITE_LIST.includes(pathname) ? (
        <ReactRouter />
      ) : (
        <BasicLayout title={VITE_APP_TITLE as string}>
          <ReactRouter />
        </BasicLayout>
      )}
    </>
  )
}

export default App
