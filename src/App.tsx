import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { ReactRouter } from '@/router'
import BasicLayout from '@/components/layout/basic-layout'
import routerList from '@/router/routerList'

import { SetRouterListAction, SetUserInfoAction } from './store/actions/common'
import { GetUserInfo } from './services/apis'
import { clearPending } from './services'

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

  useEffect(() => {
    dispatch(SetRouterListAction(routerList))
  }, [dispatch])

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
        <BasicLayout>
          <ReactRouter />
        </BasicLayout>
      )}
    </>
  )
}

export default App
