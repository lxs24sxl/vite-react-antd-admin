import { Space, Spin } from 'antd'
import React, { memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const EmptyLoading = memo(() => {
  return (
    <div className={styles.emptyLoading}>
      <img
        className={styles.emptyLoadingImage}
        src="https://xls.lbaby1998.com/static/common/loading.gif"
        alt=""
      />
      <div className={styles.emptyLoadingText}>
        <Space>
          正在加载中
          <Spin indicator={<LoadingOutlined />} />
        </Space>
      </div>
    </div>
  )
})

export default EmptyLoading
