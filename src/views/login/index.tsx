import { Button, Form, Input, Spin } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { v1 as uuidv1 } from 'uuid'
import { useDispatch } from 'react-redux'
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons'
import { SetSessionIdAction, SetUserInfoAction } from '@/store/actions/common'
import { SESSION_ID } from '@/config/storage'
import { GetUserInfo, UserSysLogin } from '@/services/apis'
import { URI_BASE } from '@/config'
import { randomNumber } from '@/utils'

import styles from './index.module.less'

const { VITE_APP_TITLE } = import.meta.env

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 }
}

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 }
}

const uuid = uuidv1()

const Login: React.FC = () => {
  const [form] = Form.useForm()
  // 随机码
  const [randomCode, setRandomCode] = useState<string>(randomNumber())
  // 等待状态
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()
  const history = useHistory()

  // 验证码路径
  const validCodeSrc = useMemo(() => {
    return `${URI_BASE}/base/manager/userSys/validCode?sessionId=${uuid}&_rnd=${randomCode}`
  }, [randomCode])

  /**
   * 刷新随机码
   */
  const refreshRandomCode = useCallback(() => {
    setRandomCode(randomNumber())
  }, [])

  /**
   * 请求事件
   */
  const onFinishEvent = useCallback(
    async values => {
      try {
        setLoading(true)

        const { data } = await UserSysLogin({
          ...values,
          sessionId: uuid
        })

        dispatch(SetSessionIdAction(data as string))

        const { data: userInfo } = await GetUserInfo()

        dispatch(SetUserInfoAction(userInfo as ObjectAnyType))

        window.localStorage.setItem(SESSION_ID, data as string)

        setLoading(false)

        history.push('/')
      } catch (error) {
        setLoading(false)
        refreshRandomCode()
      }
    },
    [refreshRandomCode, dispatch, history]
  )

  /**
   * 重置
   */
  const onResetEvent = useCallback(() => {
    form.resetFields()
  }, [form])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img
                alt="logo"
                className={styles.logo}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <span className={styles.title}>{VITE_APP_TITLE}</span>
            </Link>
          </div>
          <div className={styles.desc}>
            欢迎来到{VITE_APP_TITLE}，请填写登录信息
          </div>
        </section>

        <section className={styles.main}>
          <Spin spinning={loading}>
            <Form {...layout} form={form} name="login" onFinish={onFinishEvent}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: '请输入账户名称' }]}>
                <Input
                  size="large"
                  placeholder="请输入账户名称"
                  allowClear
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入账户密码' }]}>
                <Input.Password
                  size="large"
                  placeholder="请输入账户密码"
                  allowClear
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <div className={styles.valid}>
                <Form.Item
                  name="validCode"
                  rules={[{ required: true, message: '请输入验证码' }]}>
                  <Input
                    size="large"
                    placeholder="请输入验证码"
                    allowClear
                    className={styles.validInput}
                    prefix={<SafetyCertificateOutlined />}
                  />
                </Form.Item>
                <img
                  className={styles.validImg}
                  src={validCodeSrc}
                  alt="验证码"
                  onClick={refreshRandomCode}
                />
              </div>

              <div className={styles.actions}>
                <Button
                  className={styles.actionsBtn}
                  type="link"
                  onClick={onResetEvent}>
                  重置
                </Button>
                <Button className={styles.actionsBtn} type="link">
                  忘记密码？
                </Button>
              </div>

              <Form.Item {...tailLayout} name="test">
                <Button
                  className={styles.submitBtn}
                  type="primary"
                  htmlType="submit"
                  size="large">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </section>
      </div>
    </div>
  )
}

export default Login
