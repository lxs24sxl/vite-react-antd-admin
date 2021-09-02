import { useEffect, useRef, useState } from 'react'

export interface State {
  x: number
  y: number
}

function getscolloffset(): State {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }

  return {
    x: document.documentElement.scrollLeft + document.body.scrollLeft,
    y: document.documentElement.scrollTop + document.body.scrollTop
  }
}

const useWindowScroll = (): State => {
  const frame = useRef(0)

  const [state, setState] = useState<State>(getscolloffset())

  useEffect(() => {
    const handler = (): void => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        setState(getscolloffset())
      })
    }

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true
    })

    // 初始化
    handler()

    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return state
}

export default useWindowScroll
