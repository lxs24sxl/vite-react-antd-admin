import { AnyAction } from 'redux'
import { SET_ROUTER_LIST, SET_SESSION_ID, SET_UESR_INFO} from '@/store/constants/common'
import { CommonStoreType } from '@/types/store/common'

// 默认值
const INITIAL_STATE: CommonStoreType = {
  routerList: [],
  sessionId: '',
  userInfo: {}
}

export default function (state = INITIAL_STATE, action: AnyAction)  {
  const { type, value } = action
  switch (type) {
    case SET_ROUTER_LIST:
      return {
        ...state,
        routerList: value
      }
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: value
      }
    case SET_UESR_INFO:
      return {
        ...state,
        userInfo: value
      }
    default:
      return state
  }
}
