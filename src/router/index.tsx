import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectStateType } from '@/types/store'
import { RouteType } from '@/types/routes'

const Error = React.lazy(() => import('@/views/error'))

export const ReactRouter = () => {
  const routerList = useSelector(
    (state: ConnectStateType) => state.common.routerList
  )

  return (
    <Suspense fallback={<div style={{ fontSize: '14px' }}>正在加载中</div>}>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />

        {routerList.map((item: RouteType) => {
          if (!item.children) {
            return (
              <Route exact path={item.path} key={`route${item.code}`}>
                {item.component}
              </Route>
            )
          }

          if (item.redirect) {
            return (
              <Route key={`route${item.code}`} path={item.path}>
                {item.children?.map(child => {
                  return (
                    <Route key={`child${child.code}`} path={child.path} exact>
                      {child.component}
                    </Route>
                  )
                })}
              </Route>
            )
          }

          return (
            <Route key={`route${item.code}`} path={item.path}>
              {item.children?.map(child => {
                return (
                  <Route key={`child${child.code}`} path={child.path} exact>
                    {child.component}
                  </Route>
                )
              })}
            </Route>
          )
        })}

        <Route path="*" exact>
          <Error />
        </Route>
      </Switch>
    </Suspense>
  )
}
