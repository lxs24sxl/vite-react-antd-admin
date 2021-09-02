/* eslint-disable no-param-reassign */
import React, {
  FC,
  ReactElement,
  useCallback,
  useState,
  useRef,
  RefObject,
  useImperativeHandle,
  forwardRef,
  memo
} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import _clodeDeep from 'lodash/cloneDeep'
import ClassNames from 'classnames'
import Notice from './notice'

interface INotice {
  type: 'info' | 'success' | 'warning' | 'error' | 'loading'
  content: ReactElement
  duration: number
  onClose: (() => void) | undefined | null
  key: string
}

interface INotification {
  innerRef?: RefObject<any>
}

const Notification: FC<INotification> = memo(
  forwardRef((props, ref) => {
    const [notices, setNotices] = useState<Array<INotice>>([])
    const noticesRef = useRef<Array<INotice>>(notices)
    const [transitionTime] = useState<number>(300)
    // const [isMask, setIsMask] = useState<boolean>(false)

    const getNoticeKey = useCallback(list => {
      return `notice-${new Date().getTime()}-${list.length}`
    }, [])

    const removeNotice = useCallback(
      key => {
        const prevNotice = noticesRef.current
        const currentNotices = prevNotice.filter(notice => {
          if (notice.key === key) {
            if (notice.onClose) setTimeout(notice.onClose, transitionTime)
            return false
          }
          return true
        })
        noticesRef.current = currentNotices
        setNotices(noticesRef.current)
      },
      [transitionTime]
    )

    const addNotice = useCallback(
      notice => {
        const arr: Array<INotice> = _clodeDeep(noticesRef.current)
        notice.key = getNoticeKey(arr)
        if (arr.every(item => item.key !== notice.key)) {
          if (arr.length > 0 && arr[arr.length - 1].type === 'loading') {
            arr.push(notice)
            setTimeout(() => {
              noticesRef.current = arr
              setNotices(arr)
              // if (mask) setIsMask(mask)
            }, transitionTime)
          } else {
            arr.push(notice)
            noticesRef.current = arr
            setNotices(arr)
          }

          if (notice.duration > 0) {
            setTimeout(() => {
              removeNotice(notice.key)
              // setIsMask(false)
            }, notice.duration)
          }
        }
        return () => {
          removeNotice(notice.key)
          // setIsMask(false)
        }
      },
      [transitionTime, getNoticeKey, removeNotice]
    )

    useImperativeHandle(ref, () => ({
      addNotice: (notice: INotice) => addNotice(notice),
      removeAllNotice: () => {
        noticesRef.current = []
        setNotices([])
      }
    }))

    return (
      <TransitionGroup
        className={ClassNames({
          'toast-notification': true,
          'has-notice': !!notices.length
        })}>
        {notices.map(notice => (
          <CSSTransition
            key={notice.key}
            classNames="toast-notice-wrapper notice"
            timeout={transitionTime}>
            <Notice {...notice} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  })
)

function createNotification() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const ref = React.createRef()
  // @ts-ignore
  ReactDOM.render(<Notification ref={ref} />, div)
  return {
    // @ts-ignore
    addNotice(notice) {
      // @ts-ignore
      if (ref && ref.current && ref.current.addNotice) {
        // @ts-ignore
        return ref.current.addNotice(notice)
      }
      return false
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    },
    removeAllNotice() {
      // @ts-ignore
      if (ref && ref.current && ref.current.removeAllNotice) {
        // @ts-ignore
        return ref.current.removeAllNotice()
      }
      return false
    }
  }
}

export default createNotification()
