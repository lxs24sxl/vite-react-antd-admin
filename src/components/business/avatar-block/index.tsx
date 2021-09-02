import React, { memo, useCallback } from 'react'
import { Avatar, Menu } from 'antd'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { ConnectStateType } from '@/types/store'
import { SetUserInfoAction } from '@/store/actions/common'
import ADrapDown from '@/components/bases/a-drapdown'
import { SESSION_ID } from '@/config/storage'

import styles from './index.module.less'

export type AvatarBlockProps = {
  menu?: boolean
}

const AvatarBlock: React.FC<AvatarBlockProps> = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userInfo = useSelector(
    (state: ConnectStateType) => state.common.userInfo
  )

  const onSelectEvent = useCallback(
    ({ key }) => {
      console.log('eky', key)
      switch (key) {
        case 'logout':
          window.localStorage.setItem(SESSION_ID, '')
          dispatch(SetUserInfoAction({}))
          history.push('/login')
          break
        default:
          break
      }
    },
    [history, dispatch]
  )

  const MenuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onSelectEvent}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>

      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <ADrapDown overlay={MenuHeaderDropdown}>
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar
          className={styles.avatar}
          size="small"
          alt="avatar"
          src={
            userInfo.avatar ||
            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
        />
        <span className={`${styles.name} anticon`}>
          {userInfo.managerName || userInfo.name || '未登录'}
        </span>
      </div>
    </ADrapDown>
  )
}

export default memo(AvatarBlock)
