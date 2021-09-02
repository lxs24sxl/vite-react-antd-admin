import React, { FC, ReactElement } from 'react'

interface INotice {
  type: 'info' | 'success' | 'warning' | 'error' | 'loading'
  content: ReactElement
}

const Notice: FC<INotice> = props => {
  const { type, content } = props
  const icons = {
    info: 'icon-info-circle-fill',
    success: 'icon-check-circle-fill',
    warning: 'icon-warning-circle-fill',
    error: 'icon-close-circle-fill',
    loading: 'icon-loading'
  }

  return (
    <div className={`toast-notice ${type}`}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#${icons[type]}`} />
      </svg>
      <span>{content}</span>
    </div>
  )
}

export default Notice
