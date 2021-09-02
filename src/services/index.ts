import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import { notification, Modal } from 'antd'
import { NotificationApi } from 'antd/es/notification'
import qs from 'qs'
import store from '@/store'
import { SESSION_ID } from '@/config/storage'
import { URI_BASE } from '@/config/index'
import { randomNumber, throttle } from '@/utils'
import { ConnectStateType } from '@/types/store'
import { ARequestType, AResponseType, RequestDataType } from '@/types/services'

export interface AydResponseType {
  data: ObjectAnyType | number | string
  des?: string
  desc?: string
  code: number | string
  t?: number
}

// pending逻辑
const pendingMap = new Map()

const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')

  if (!config.cancelToken) {
    config.cancelToken = new axios.CancelToken(cancel => {
      if (!pendingMap.has(url)) { // 如果 pendingMap 中不存在当前请求，则添加进去
        pendingMap.set(url, cancel)
      }
    })
  }
}

const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pendingMap.has(url)) { // 如果在 pendingMap 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pendingMap.get(url)
    cancel(url)
    pendingMap.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pendingMap) {
    cancel(url)
  }

  pendingMap.clear()
}
// pending逻辑

const LOGIN_PATH = `//${window.location.host}/#/login?back_url=${window.location.href}`

const { VITE_APP_NAME, NODE_ENV } = import.meta.env
const IS_PROD = NODE_ENV === 'production'

const codeMessage: StringMapType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const instance = axios.create({
  baseURL: URI_BASE,
  timeout: 120000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

/**
 * 打开带icon的提示框
 * @param type 类型
 * @param message 消息文本
 * @param description 内容文本
 */
const openNotificationWithIcon = (
  type: 'error' | 'warn' | 'success',
  message: string | undefined,
  description: string | undefined
): void => {
  const oNotification: NotificationApi = notification
  oNotification[type]({
    message: message || '网络异常',
    description: description || '您的网络发生异常，无法连接服务器'
  })
}

const WHITE_LIST = ['/login']
/**
 * 403授权过期回调
 */
const handleAuthForbid = throttle((): void => {
  if (WHITE_LIST.find(path => window.location.hash.indexOf(path) > -1)) return
  Modal.warning({
    title: '授权已过期',
    content: '请点击确定, 重新登录。',
    onOk() {
      localStorage.removeItem(SESSION_ID)
      window.location.href = LOGIN_PATH
    }
  })
})

/**
 * 其他错误码回调
 */
const handleNormalError = (
  data: AResponseType,
  response: AxiosResponse
): void => {
  const reqData = JSON.parse(response.config.data)
  const { code, des, desc } = data
  const errorText = des || desc || codeMessage[code]

  openNotificationWithIcon('error', errorText, `错误编码: ${reqData.seqNo}`)
}

// /**
//  * 成功返回回调
//  */
// const handleRcode = (response: AxiosResponse) => {
//   const data = response.data
//   if (data.code === 100) {
//     if (!IS_PROD) console.warn('res: ', data)

//     // 接口成功code
//     return Promise.resolve(data.data)
//   } else {
//     if (data.code === 403) {
//       // 登录过期code
//       handleAuthForbid()
//     } else {
//       handleNormalError(data, response)
//     }

//     return Promise.reject(data)
//   }
// }

instance.interceptors.request.use(
  (request) => {
    removePending(request) // 在请求开始前，对之前的请求做检查取消操作
    addPending(request) // 将当前请求添加到 pending 中

    const {data} = request
    // 封装传参结构
    request.data = {
      data,
      seqNo: randomNumber(),
      system: VITE_APP_NAME
    }

    const state: ConnectStateType = store.getState()

    if (!IS_PROD) console.warn('req: ', request.data)

    const {sessionId} = state.common
    const localToken = localStorage.getItem(SESSION_ID)

    if (!sessionId) {
      // 非空判断
      if (!['undefined', null, ''].includes(localToken)) {
        store.dispatch({
          type: 'SET_SESSION_ID',
          data: {
            sessionId: localToken
          }
        })
      }
    }

    if (sessionId || localToken) {
      request.headers.sessionId = state.common.sessionId || localToken
    }
    return request
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    removePending(response) // 在请求结束后，移除本次请求

    if (response.status === 200) {
      // return handleRcode(response)
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  err => {
    return Promise.reject(err)
  }
)

const request: ARequestType<RequestDataType> = (params) => new Promise(async (resolve, reject) => {
  try {
    const response = await instance(params)

    const {data} = response
    if (data.code === 100) {
      if (!IS_PROD) console.warn('res: ', data)

      // 接口成功code
      // return Promise.resolve(data.data)

      resolve(data)
    } else {
      if (data.code === 403) {
        // 登录过期code
        handleAuthForbid()
      } else {
        handleNormalError(data, response)
      }

      reject(data)
    }
  } catch (error) {
    reject(error)
  }
})

export default request
