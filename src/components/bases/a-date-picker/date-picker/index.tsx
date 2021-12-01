import { DatePicker, DatePickerProps } from 'antd'
import { Moment } from 'moment'
import React, { FC, memo, useMemo } from 'react'
import { EventValue } from 'rc-picker/lib/interface'
import { formatDateString, formatTimeToMoment } from '@/utils'

export type ADatePickerType = DatePickerProps & {}

/**
 * 时间选择器
 * 参考antd时间选择器
 */
const ADatePicker: FC<ADatePickerType> = memo(
  ({ format = 'YYYY-MM-DD', onChange: oldChange, ...restProps }) => {
    const newProps = useMemo(
      () => ({
        ...restProps,
        format,
        // ...restProps, // 有问题
        onChange(dates: EventValue<Moment>, dateStrings: string): void {
          dateStrings = formatDateString(dateStrings, '00:00:00')
          if (dates) {
            dates = formatTimeToMoment(dateStrings)
          }
          oldChange?.(dates, dateStrings)
        }
      }),
      [oldChange, restProps, format]
    )
    return <DatePicker {...newProps} />
  }
)

export default ADatePicker
