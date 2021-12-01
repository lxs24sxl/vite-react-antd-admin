import React, { FC, memo, ReactElement, useCallback, useMemo } from 'react'
import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
// import ABreadcrumb from '@/components/bases/a-breadcrumb'
import AWaterMark from '@/components/bases/a-water-mark'
import { ConnectStateType } from '@/types/store'
import { SetCollapsedAction } from '@/store/actions/common'

import AMenus from '../a-menus'
import HeaderRight from '../header-right'
import './index.styl'

export interface BasicLayoutProps {
  children?: ReactElement | ReactElement[]
  title?: string
}

const { Header, Sider, Content } = Layout

/**
 * 基础布局组件
 * @param {ReactElement | ReactElement[]} children 插槽
 * @param {string} title 标题
 */
const BasicLayout: FC<BasicLayoutProps> = memo(({ title, children }) => {
  // 是否缩放
  const collapsed = useSelector(
    (state: ConnectStateType) => state.common.collapsed
  )

  const dispatch = useDispatch()

  const userInfo = useSelector(
    (state: ConnectStateType) => state.common.userInfo
  )

  const markContent = useMemo(() => {
    const { managerName, name, mobile } = userInfo
    const suffix = `${mobile || ''}`.length > 4 ? `${mobile.slice(-4)}` : ''
    return `${managerName || name || '爱婴岛'}${suffix}`
  }, [userInfo])

  /**
   * 收缩菜单事件
   */
  const handleToggleEvent = useCallback(
    value => {
      dispatch(SetCollapsedAction(value))
    },
    [dispatch]
  )

  return (
    <Layout className="basic-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="basic-layout-title">
          <img
            alt=""
            className="title-logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          {!collapsed ? <h1>{title}</h1> : null}
        </div>

        <AMenus />
      </Sider>

      <Layout className="basic-layout-right site-layout">
        <Header
          className="right-header site-layout-background"
          style={{ paddingLeft: 20 }}>
          <div className="header-left">
            {collapsed ? (
              <MenuUnfoldOutlined
                className="header-left-icon"
                onClick={() => handleToggleEvent(false)}
              />
            ) : (
              <MenuFoldOutlined
                className="header-left-icon"
                onClick={() => handleToggleEvent(true)}
              />
            )}
          </div>
          <div className="header-right">
            <HeaderRight />
          </div>
        </Header>
        <AWaterMark content={markContent}>
          <Content className="site-layout-content">{children}</Content>
        </AWaterMark>
      </Layout>
    </Layout>
  )
})

export default BasicLayout
