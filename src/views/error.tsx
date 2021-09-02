import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

function Error() {
  const history = useHistory()

  return (
    <div className="error">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，该页面无法访问，请点击按钮返回首页"
        extra={
          <Button type="primary" onClick={() => history.push('/home')}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default Error
