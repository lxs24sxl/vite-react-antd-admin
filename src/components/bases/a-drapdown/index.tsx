import { Dropdown, DropDownProps } from 'antd'
import classNames from 'classnames'
import React, { memo, ReactNode } from 'react'
import './index.less'

export type ADrapdownProps = {
  overlayClassName?: string
  overlay: ReactNode | (() => ReactNode) | any
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'bottomCenter'
  children?: ReactNode | any
} & Omit<DropDownProps, 'overlay'>

const ADrapdown: React.FC<ADrapdownProps> = ({
  overlayClassName: cls,
  children,
  ...resProps
}) => {
  return (
    <Dropdown
      overlayClassName={classNames(cls, { container: true })}
      {...resProps}>
      {children}
    </Dropdown>
  )
}

export default memo(ADrapdown)
