import { ARequestApiNoParamsType, ARequestApiType } from '@/types/services'
import Request from '../index'

/**
 * 获取用户信息
 */
export const GetUserInfo: ARequestApiNoParamsType = () => {
  return Request({
    url: `/manager/user/userInfo`,
    method: 'GET',
    data: {}
  })
}

/**
 * 登录接口
 */
export const UserSysLogin: ARequestApiType<{
  sessionId: number | string
  name: string
  password: string
  validaCode: string
}> = (data) => {
  return Request({
    url: `/base/manager/userSys/login?sessionId=${data.sessionId}`,
    method: 'POST',
    data
  })
}
