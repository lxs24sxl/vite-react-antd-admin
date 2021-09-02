import { Method } from "axios"

export interface RequsetWXPayParamsType {
  uri: string,
  payNo: string
}

export interface RequestParamsType<T> {
  url: string,
  data: T,
  method?: Method,
  headers?: Headers,
  needSession?: boolean
}

export interface AResponseType {
  data:  PoorMansUnknownType
  des?: string
  desc?: string
  code: number | string
  t?: number
}

export interface WxConfigType {
  uri: string,
  debug?: boolean,
  apiList?: string[],
  openTagList?: string[]
}

export interface CheckRegisterType {
  uri: string,
  promoCode?: string | number,
  needSignup?: boolean,
  onlyShop?: number | string,
  authState?: string,
  source?: string,
  envCallback?: () => void
}

export interface CheckRegisterResponseType {
  sessionId: string,
  guideId?: string | number,
  member?: any
}

// 封装层api类型
export type ARequestType<T> = (params: RequestParamsType<T>) => Promise<AResponseType>

// 通用返回数据类型
export type RequestDataType = unknown

// 请求api的类型
export type ARequestApiNoParamsType = () =>  Promise<AResponseType>
export type ARequestApiType<T> = (data: T) =>  Promise<AResponseType>

export interface AWechatType {
  requestWXPay: (params: RequsetWXPayParamsType) => void,
  Request: ARequestType<RequestDataType>,
  wxConfig: (params: WxConfigType) => Promise<any>,
  checkRegister: (params: CheckRegisterType) => Promise<CheckRegisterResponseType>
}
