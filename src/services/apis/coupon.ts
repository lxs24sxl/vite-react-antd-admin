import { ARequestApiType } from '@/types/services'
import Request from '@/services/wechat'

type GetCouponsStateType = ARequestApiType<{id: number | string}>

/**
 * 套券活动：用户是否参与状态接口
 */
export const GetCouponsState: GetCouponsStateType = ({ id }) => {
  return Request({
    url: '/member/setCoupons/state',
    method: 'POST',
    data: {
      id
    }
  })
}

type ReceiveCouponsType = ARequestApiType<{id: number | string}>

/**
 * 套券活动：一键领取接口
 */
export const ReceiveCoupons: ReceiveCouponsType = ({ id }) => {
  return Request({
    url: '/member/setCoupons/receive',
    method: 'POST',
    data: {
      id
    }
  })
}

/**
 * 优惠券管理：直播优惠券领取
 */
export const ReceiveCouponByNo:ARequestApiType<number | string>  = receiveNo => {
  return Request({
    url: '/member/shop/coupon/receiveCoupon',
    method: 'POST',
    data: receiveNo
  })
}

/**
 * 套券活动：领取可选优惠券接口
 */
export const ReceiveCouponsActSelectCoupon: ARequestApiType<{
  id: number | string
  couponNo: string
}> = ({
  couponNo,
  id
}) => {
  return Request({
    url: '/member/setCoupons/receive/coupon',
    method: 'POST',
    data: {
      couponNo,
      id
    }
  })
}
