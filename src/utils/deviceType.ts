/**
 *
 * @param {*} UA ,就是userAgent
 * @returns  type: 设备类型
 *           env: 访问环境(微信/微博/qq)
 *           masklayer: 就是给外部拿到判断是否显示遮罩层的,一些特殊环境要引导用户到外部去打开访问
 */

const isWechat = (UA: string)  => {
  return /MicroMessenger/i.test(UA)
}

const isWeibo = (UA: string)  => {
  return /Weibo/i.test(UA)
}

const isQQ = (UA: string)  => {
  return /QQ/i.test(UA)
}

const isMoible = (UA:string)  => {
  return /(phone|pad|pod|ipad|ipod|iPhone|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
    UA
  )
}

const isIOS = (UA: string)  => {
  return /iPhone|iPad|iPod/i.test(UA)
}
const isIpad = (UA: string)  => {
  return /iPad|iPod/i.test(UA)
}

const isAndroid = (UA: string)  => {
  return /Android/i.test(UA)
}

export const getDeviceType = (UA: string)  => {
  if (isMoible(UA) && !isIpad(UA)) {
    if (isIOS(UA)) {
      if (isWechat(UA)) {
        return {
          type: 'ios',
          env: 'wechat',
          masklayer: true
        }
      }
      if (isWeibo(UA)) {
        return {
          type: 'ios',
          env: 'weibo',
          masklayer: true
        }
      }
      if (isQQ(UA)) {
        return {
          type: 'ios',
          env: 'qq',
          masklayer: true
        }
      }
      return {
        type: 'ios'
      }
    }
    if (isAndroid(UA)) {
      if (isWechat(UA)) {
        return {
          type: 'android',
          env: 'wechat',
          masklayer: true
        }
      }
      if (isWeibo(UA)) {
        return {
          type: 'android',
          env: 'weibo',
          masklayer: true
        }
      }
      if (isQQ(UA)) {
        return {
          type: 'android',
          env: 'qq',
          masklayer: true
        }
      }
      return {
        type: 'android'
      }
    }

    return {
      type: 'mobile'
    }
  }

  return {
    type: 'pc'
  }
}

export const isIphoneX = (UA: string) => {
  return /iphone/gi.test(UA) &&
        window.devicePixelRatio &&
          window.devicePixelRatio === 3 &&
            window.screen.width === 375 &&
              window.screen.height === 812
}
