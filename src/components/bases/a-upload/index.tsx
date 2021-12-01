import { Button, Image, message, Upload } from 'antd'
import { RcFile } from 'rc-upload/lib/interface'
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { UploadChangeParam } from 'antd/lib/upload'

import { LoadingOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'

import { UPLOAD_URL } from '@/config'
import { INTEGRATION_SESSION_ID } from '@/config/storage'

import styles from './index.module.less'

declare type BeforeUploadValueType = void | boolean | string | Blob | File

export type AUploadType = {
  action?: string
  value?: string
  onSuccess?: (src: string) => void
  onDelete?: () => void
  onChange?: (src?: string) => void
  loading?: boolean
  onBeforeUpload?: (
    file: RcFile
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>
}

/**
 * 上传组件
 * @param {action} string 上传路径
 * @param {value} string url值
 * @param {onSuccess} Function 成功事件
 * @param {onDelete} Function 删除事件
 * @param {onChange} Function 改变事件
 * @param {loading} boolean 是否等待
 * @param {onBeforeUpload} Function 上传前事件
 */
const AUpload: FC<AUploadType> = memo(props => {
  const {
    value,
    onSuccess,
    onDelete,
    loading,
    onBeforeUpload,
    onChange,
    action = `${UPLOAD_URL}managerUserAvatar`
  } = props

  const [uploadLoading, setUploadLoading] = useState(false)

  const [src, setSrc] = useState(value)

  const commonLoading = useMemo(() => {
    return uploadLoading || loading
  }, [loading, uploadLoading])

  const uploadButton = (
    <div>
      {commonLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  const onBeforeUploadEvent = useCallback(
    (file: RcFile) => {
      if (onBeforeUpload) {
        return onBeforeUpload(file)
      }
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    [onBeforeUpload]
  )

  const onChangeEvent = useCallback(
    (info: UploadChangeParam) => {
      const { file } = info
      const { status } = file
      if (status === 'uploading') {
        setUploadLoading(true)
        return
      }

      if (status === 'done') {
        const { response } = file
        const { data } = response
        setSrc(data)
        onSuccess?.(data)
        onChange?.(data)
        setUploadLoading(false)
        return
      }

      if (['error', 'removed'].includes(status as string)) {
        setUploadLoading(false)
      }
    },
    [onSuccess, onChange]
  )

  const handleDeleteEvent = useCallback(() => {
    setSrc('')
    onDelete?.()
    onChange?.('')
  }, [onDelete, onChange])

  useEffect(() => {
    setSrc(value)
  }, [value])

  return (
    <div className={styles.aUpload}>
      <Upload
        className={styles.aUploadBox}
        listType="picture-card"
        showUploadList={false}
        action={action}
        beforeUpload={onBeforeUploadEvent}
        onChange={onChangeEvent}
        disabled={!!src}
        headers={{
          sessionId: localStorage.getItem(INTEGRATION_SESSION_ID) as string
        }}>
        {src ? (
          <Image
            preview={{ src }}
            src={src}
            alt="avatar"
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      {src && (
        <>
          <Button
            className={styles.aUploadDelete}
            type="primary"
            shape="circle"
            size="small"
            onClick={handleDeleteEvent}
            icon={<CloseOutlined />}
          />
          {/* <div className={styles.aUploadActions}>
            <SearchOutlined
              className={styles.search}
            />
          </div> */}
        </>
      )}
    </div>
  )
})

export default AUpload
