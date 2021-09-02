import { RouteType } from "../routes";

export type RouterListType = RouteType[]

export interface CommonStoreType {
  routerList: RouterListType
  sessionId: string
  userInfo: ObjectAnyType
}
