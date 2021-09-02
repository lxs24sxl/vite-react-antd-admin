import React, {
  useEffect,
  useState,
  memo,
  CSSProperties,
  FC,
  useMemo
} from 'react'
import ClassNames from 'classnames'

import './index.styl'

interface ImagePlusType {
  oss?: string
  src?: string
  mode?: string
  webp?: boolean
  lazyLoad?: boolean
  showMenuByLongpress?: boolean
  onError?: () => void
  onLoad?: () => void
  inheritStyle?: CSSProperties
  inheritClass?: string
}

const ImagePlus: FC<ImagePlusType> = props => {
  const {
    oss = 'Q80',
    src = '',
    mode = 'scaleToFill',
    // webp = false,
    // lazyLoad = false,
    // showMenuByLongpress = false,
    onError = () => {},
    onLoad = () => {},
    inheritStyle = {},
    inheritClass
  } = props

  const [link, setLink] = useState('')

  const ImagePlusClassNames = useMemo(() => {
    return ClassNames({
      [inheritClass || '']: true,
      'image-plus': true,
      [mode]: true
    })
  }, [inheritClass, mode])

  useEffect(() => {
    const reg = /\.(jpg|jpeg|png)$/
    const url = reg.test(src) ? `${src}?x-oss-process=style/${oss}` : src
    setLink(url)
  }, [oss, src])

  return (
    <div className={ImagePlusClassNames}>
      <img
        className="image-plus-image"
        src={link}
        object-fit={mode}
        style={inheritStyle}
        onError={onError}
        onLoad={onLoad}
        alt=""
      />
    </div>
  )
}

export default memo(ImagePlus)
