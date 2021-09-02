import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ConnectStateType } from '@/types/store'

interface AMenusType {}

const AMenus: FC<AMenusType> = () => {
  // 路径
  const { pathname } = useLocation()
  // 选中的key
  const [selectedKey, setSelectKey] = useState<string>(pathname || '')
  // 当前打开的菜单key
  const [openKeys, setOpenKeys] = React.useState<string[]>([
    `/${pathname.split('/')[1]}`
  ])

  const routerList = useSelector(
    (state: ConnectStateType) => state.common.routerList
  )

  // 根节点key列表
  const rootSubmenuKeys = useMemo(() => {
    return routerList.reduce((result: string[], item) => {
      result.push(item.path)
      return result
    }, [])
  }, [routerList])

  /**
   * SubMenu 展开/关闭的回调事件
   */
  const onOpenChangeEvent = useCallback(
    keys => {
      const latestOpenKey = keys.find(
        (key: string) => openKeys.indexOf(key) === -1
      )
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys)
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
    },
    [openKeys, rootSubmenuKeys]
  )

  useEffect(() => {
    setSelectKey(pathname)
  }, [pathname])

  return (
    <Menu
      className="a-menus"
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
      defaultOpenKeys={openKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChangeEvent}>
      {routerList.map(item => {
        if (item.isHidden) return null

        if (item.children?.length) {
          return (
            <SubMenu key={item.path} title={item.name} icon={item.icon}>
              <>
                {item.children?.map(child => (
                  <Menu.Item key={child.path}>
                    <Link to={child.path}>{child.name}</Link>
                  </Menu.Item>
                ))}
              </>
            </SubMenu>
          )
        }

        return (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default memo(AMenus)
