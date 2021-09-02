import { SET_ROUTER_LIST, SET_SESSION_ID, SET_UESR_INFO } from '@/store/constants/common'
import {  RouterListType } from '@/types/store/common'

export const SetRouterListAction = (value: RouterListType) => {
  return {
    type: SET_ROUTER_LIST,
    value
  }
}

export const SetSessionIdAction = (value: string) => {
  return {
    type: SET_SESSION_ID,
    value
  }
}

export const SetUserInfoAction = (value: ObjectAnyType) => {
  return {
    type: SET_UESR_INFO,
    value
  }
}
