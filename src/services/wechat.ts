import { URI_BASE } from '@/config/index'
import { AWechatType, ARequestType, RequestDataType} from '@/types/services/index'
// import Toast from '@/components/bases/a-toast'

declare global {
  interface Window {
    AWechat: AWechatType
  }
}

const Request: ARequestType<RequestDataType> = ({ url, data, method, headers, needSession }) => {
  return new Promise((resolve, reject) => {
    window.AWechat.Request({
      url: URI_BASE + url,
      data,
      method,
      headers,
      needSession
    }).then(res => {
      resolve(res)
    }).catch(e => {
      setTimeout(() => {
        // Toast.info(e.des || '系统繁忙', 3000)
      }, 0)
      reject(e)
    })
  })
}

export default Request
