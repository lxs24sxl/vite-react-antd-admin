import { RouteType } from "../routes"

export type RouterListType = RouteType[]

export type ResourceMapType = {
  [key: string]: number
}

export interface CommonStoreType {
  routerList: RouterListType
  sessionId: string
  userInfo: ObjectAnyType
  resourceMap: ResourceMapType
  collapsed: boolean
}
