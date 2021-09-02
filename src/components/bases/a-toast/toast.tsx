import notificationDOM from './notification'
import './toast.css'

let notification: any
const notice = (
  type: 'info' | 'success' | 'warning' | 'error' | 'loading' | 'hideLoading',
  content?: string,
  duration?: number,
  onClose?: (() => void) | undefined | null
) => {
  if (!notification) notification = notificationDOM
  if (type === 'hideLoading') {
    return notification.removeAllNotice()
  }
  return notification.addNotice({
    type,
    content,
    duration: duration || 2000,
    onClose
  })
}

export default {
  info(content: string, duration?: number, onClose?: () => void) {
    return notice('info', content, duration, onClose)
  },
  success(content: string, duration?: number, onClose?: () => void) {
    return notice('success', content, duration, onClose)
  },
  warning(content: string, duration?: number, onClose?: () => void) {
    return notice('warning', content, duration, onClose)
  },
  error(content: string, duration?: number, onClose?: () => void) {
    return notice('error', content, duration, onClose)
  },
  loading(content: string, duration?: number, onClose?: () => void) {
    return notice('loading', content, duration, onClose)
  },
  hideLoading() {
    return notice('hideLoading')
  }
}
