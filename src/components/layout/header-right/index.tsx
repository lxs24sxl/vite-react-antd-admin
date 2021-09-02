import { Space } from 'antd'
import React, { memo } from 'react'
import AvatarBlock from '@/components/business/avatar-block'

const HeaderRight: React.FC = () => {
  return (
    <Space>
      <AvatarBlock />
    </Space>
  )
}

export default memo(HeaderRight)
