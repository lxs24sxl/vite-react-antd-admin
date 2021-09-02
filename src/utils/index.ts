const INIT_PROP = 'children'

interface WalkType {
  (tree: ObjectAnyType, depth?: number, parentTree?: ObjectAnyType): void
}

export const dfs = (
  tree: ObjectAnyType,
  ope: Function,
  prop = INIT_PROP
): void => {
  let children: ObjectAnyType

  const walk: WalkType = (curTree, depth = 1, parentTree) => {
    ope(curTree, depth, parentTree)

    children = curTree[prop]

    if (children && children.length) {
      children.forEach((node: ObjectAnyType) => {
        walk(node, depth + 1, curTree)
      })
    }
  }


  walk(tree)
}

export function randomNumber(): string {
  let outTradeNo = String(new Date().getTime())
  for (let i = 0; i < 6; i++) {
    outTradeNo += String(Math.floor(Math.random() * 10))
  }
  return outTradeNo
}

/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atLeast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
export function throttle(fn: Function, delay = 300, atLeast = 600): Function {
  let timer = 0
  let previous: number | null = null
  return function (): void {
    const now = +new Date()
    if (!previous) previous = now
    if (now - previous > atLeast) {
      fn()
      // 重置上一次开始时间为本次结束时间
      previous = now
    } else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
}

export function formatTime(
  time: number | string,
  fmt = 'yyyy/MM/dd hh:mm:ss'
): string {
  // 数据库存的是11位时间戳
  const date = new Date(+time * 1000)
  const o: ObjectAnyType = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds()
  }
  let result = fmt
  if (/(y+)/.test(result)) {
    result = result.replace(
      RegExp.$1,
      (`${date.getFullYear()}`).substr(4 - RegExp.$1.length)
    )
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(result)) {
      result = result.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`o[k]`).length)
      )
    }
  })
  return result
}
