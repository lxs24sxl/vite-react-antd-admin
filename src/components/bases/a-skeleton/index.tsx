import React, { FC, memo } from 'react'
import ClassNames from 'classnames'

import './index.styl'

interface ASkeletonType {
  active: boolean
}

const ASkeleton: FC<ASkeletonType> = ({ active = false }) => {
  const ASkeletonClassNames = ClassNames({
    'a-skeleton': true,
    'a-skeleton--active': active
  })

  return (
    <div className={ASkeletonClassNames}>
      <div className="a-skeleton-header" />

      <div className="a-skeleton-nav">
        <div className="nav-item">
          <div className="nav-item-image" />
          <div className="nav-item-text" />
        </div>

        <div className="nav-item">
          <div className="nav-item-image" />
          <div className="nav-item-text" />
        </div>

        <div className="nav-item">
          <div className="nav-item-image" />
          <div className="nav-item-text" />
        </div>

        <div className="nav-item">
          <div className="nav-item-image" />
          <div className="nav-item-text" />
        </div>

        <div className="nav-item">
          <div className="nav-item-image" />
          <div className="nav-item-text" />
        </div>
      </div>

      <div className="a-skeleton-banner large" />

      <div className="a-skeleton-banner" />

      <div className="a-skeleton-banner large" />

      <div className="a-skeleton-banner" />

      <div className="a-skeleton-banner large" />
    </div>
  )
}

export default memo(ASkeleton)
