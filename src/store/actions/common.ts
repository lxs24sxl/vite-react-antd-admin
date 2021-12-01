import { SET_ROUTER_LIST, SET_SESSION_ID, SET_UESR_INFO, SET_COLLAPSED, SET_RESOURCE_MAP } from '@/store/constants/common'
import {  RouterListType, ResourceMapType } from '@/types/store/common'

/**
 * 设置路由信息
 */
export const SetRouterListAction = (value: RouterListType) => {
  return {
    type: SET_ROUTER_LIST,
    value
  }
}

/**
 * 设置sessionId
 */
export const SetSessionIdAction = (value: string) => {
  return {
    type: SET_SESSION_ID,
    value
  }
}

/**
 * 设置用户信息
 */
export const SetUserInfoAction = (value: ObjectAnyType) => {
  return {
    type: SET_UESR_INFO,
    value
  }
}


/**
 * 设置权限码映射
 */
export const SetResourceMapAction = (value: ResourceMapType) => {
  return {
    type: SET_RESOURCE_MAP,
    value
  }
}


/**
 * 设置菜单是否缩放
 */
export const SetCollapsedAction = (value: boolean) => {
  return {
    type: SET_COLLAPSED,
    value
  }
}
