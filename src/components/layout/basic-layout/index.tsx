import React, { FC, memo, ReactElement, useCallback, useState } from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import ABreadcrumb from '@/components/bases/a-breadcrumb'

import AMenus from '../a-menus'
import HeaderRight from '../header-right'

import './index.styl'

export interface BasicLayoutProps {
  children?: ReactElement | ReactElement[]
  title?: boolean
}

const { Header, Sider, Content } = Layout

const BasicLayout: FC<BasicLayoutProps> = props => {
  const { title, children } = props
  // 是否缩放
  const [collapsed, setCollapsed] = useState(false)

  /**
   * 收缩菜单事件
   */
  const handleToggleEvent = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  return (
    <Layout className="basic-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="basic-layout-title">
          <img
            alt=""
            className="title-logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          {!collapsed ? <h1>{title || '资源整合后台'}</h1> : null}
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
                onClick={handleToggleEvent}
              />
            ) : (
              <MenuFoldOutlined
                className="header-left-icon"
                onClick={handleToggleEvent}
              />
            )}
          </div>
          <div className="header-right">
            <HeaderRight />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}>
          <ABreadcrumb />

          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(BasicLayout)
