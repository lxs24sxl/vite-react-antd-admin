import React, { FC, memo, useMemo, useState } from 'react'
import { DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import { RangePickerProps } from 'antd/lib/date-picker'
import { RangeValue } from 'rc-picker/lib/interface'

import { formatDateString, formatTime, formatTimeToMoment } from '@/utils'

const { RangePicker } = DatePicker

export interface ARangePickerType
  extends Omit<RangePickerProps, 'defaultValue'> {
  defaultStartValue?: string
  defaultEndValue?: string
  defaultValue?: string[] | undefined
  isTimestamp?: boolean
}

export interface UseRangePickerType<DateType> {
  setChangeData: (
    dates: RangeValue<DateType>,
    dateStrings: [string, string]
  ) => void
  range: string[] | undefined
  momentRange?: RangeValue<DateType>
}

export const useRangePicker = (): UseRangePickerType<Moment> => {
  const [range, setRange] = useState<string[]>([])
  const [momentRange, setMomentRange] = useState<RangeValue<Moment>>()

  const setChangeData = (
    dates: RangeValue<Moment>,
    dateStrings: [string, string]
  ): void => {
    setRange(dateStrings)
    setMomentRange(dates)
  }
  return {
    setChangeData,
    range,
    momentRange
  }
}

/**
 * 时间范围选择器
 * 属性
 * 参考antd时间范围选择器
 */
const ARangePicker: FC<ARangePickerType> = memo(
  ({
    defaultValue,
    format = 'YYYY-MM-DD',
    onChange: oldChange,
    isTimestamp = false, // 是否为10位的时间戳
    // defaultStartValue = '',
    // defaultEndValue = '',
    ...restProps
  }) => {
    const formatDefaultValue: RangeValue<Moment> = useMemo(() => {
      let [start, end] = defaultValue || []

      if (isTimestamp) {
        start = formatTime(start, 'yyyy-MM-dd')
        end = formatTime(end, 'yyyy-MM-dd')
      }

      return start || end
        ? [moment(start, format as string), moment(end, format as string)]
        : [null, null]
    }, [defaultValue, isTimestamp, format])

    const newProps = useMemo(
      () => ({
        ...restProps,
        defaultValue: defaultValue ? formatDefaultValue : undefined,
        format,
        // ...restProps, // 有问题
        onChange(
          dates: RangeValue<Moment>,
          dateStrings: [string, string]
        ): void {
          if (isTimestamp) {
            dateStrings[0] = formatDateString(dateStrings[0], '00:00:00')
            dateStrings[1] = formatDateString(dateStrings[1], '23:59:59')
            if (dates) {
              dates[0] = formatTimeToMoment(dateStrings[0])
              dates[1] = formatTimeToMoment(dateStrings[1])
            }
          }
          oldChange?.(dates, dateStrings)
        }
      }),
      [
        defaultValue,
        formatDefaultValue,
        isTimestamp,
        oldChange,
        restProps,
        format
      ]
    )

    return <RangePicker {...newProps} />
  }
)

export default ARangePicker
