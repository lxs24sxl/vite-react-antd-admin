import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react'
import { Button, Cascader, Col, Input, Row, Select, Space } from 'antd'
import classNames from 'classnames'
import { CascaderOptionType } from 'antd/lib/cascader'

import { UpOutlined } from '@ant-design/icons'

import styles from './index.module.less'
import ARangePicker from '../a-date-picker/range-picker'
import ADatePicker from '../a-date-picker/date-picker'

const { Option } = Select

/** 单个列属性 */
export type FilterColumnType = {
  key: string
  label: string
  type:
    | 'input'
    | 'select'
    | 'rangePicker'
    | 'empty'
    | 'search'
    | 'datePicker'
    | 'cascader'
  options?: Array<ObjectAnyType>
  placeholder?: string
  loadData?: (selectedOptions: CascaderOptionType[] | undefined) => void
  align?: 'center' | 'left' | 'right'
}

/** 列数组属性 */
export type FilterColumnsType = FilterColumnType[]

/** 筛选组件类型 */
export interface AFilterType {
  dataSource: ObjectAnyType
  columns: FilterColumnsType
  onChange?: (option: ObjectAnyType) => void
  onClear?: () => void
  onSearch?: (dataSource: ObjectAnyType) => void
  loading?: boolean
  hideMargin?: boolean
}

/** 空值 */
const empty: FilterColumnType = {
  label: '',
  type: 'empty',
  key: 'filter1'
}

/**
 * 爱婴岛筛选组件
 * @param {ObjectAnyType} dataSource 原对象数据
 * @param {Function} onChange 改变事件
 */
const AFilter: FC<AFilterType> = memo(
  ({
    dataSource,
    onChange,
    columns = [],
    onClear,
    onSearch,
    loading = false,
    hideMargin = false
  }) => {
    /** 是否展开 */
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const isOpenRef = useRef<boolean>(isOpen)

    /** 缓存数据 */
    const cacheDataSourceRef = useRef<ObjectAnyType>(dataSource)

    /** 展开项数组 */
    const displayColumns: Array<FilterColumnsType> = useMemo(() => {
      const list = columns
        .slice(0, isOpen ? columns.length : 2)
        .reduce(
          (
            result: Array<FilterColumnsType>,
            item: FilterColumnType,
            index: number
          ) => {
            if (index % 3 === 0) {
              result.push([item])
            } else {
              result[Math.floor(index / 3)]?.push(item)
            }
            return result
          },
          []
        )

      // 最后一个数组
      const lastList = list[list.length - 1]

      if (lastList.length === 3) {
        list.push([
          { ...empty },
          { ...empty, key: 'filter2' },
          { ...empty, key: 'filter3', type: 'search' }
        ])
      } else {
        for (let i = lastList.length + 1; i <= 3; i++) {
          lastList.push({
            ...empty,
            key: `filter${i}`,
            type: i === 3 ? 'search' : 'empty'
          })
        }
      }
      return list
    }, [isOpen, columns])

    /**
     * 正常数据改变事件
     */
    const onDataChangeEvent = useCallback(
      (value, key) => {
        onChange?.({
          ...dataSource,
          [key]: value
        })
      },
      [onChange, dataSource]
    )

    /**
     * 时间范围选择器
     */
    const onRangePickerChangeEvent = useCallback(
      (dates, dataStrings, key) => {
        onChange?.({
          ...dataSource,
          [key]: dataStrings,
          [`${key}Moment`]: dates
        })
      },
      [onChange, dataSource]
    )

    /**
     * 展开收起事件
     */
    const handleExpendEvent = useCallback(() => {
      isOpenRef.current = !isOpenRef.current
      setIsOpen(isOpenRef.current)
    }, [])

    /**
     * 重置事件
     */
    const handleClearEvent = useCallback(() => {
      onChange?.(cacheDataSourceRef.current)
      onClear?.()
    }, [onChange, onClear])

    /**
     * 查询事件
     */
    const handleSearchEvent = useCallback(() => {
      onSearch?.(dataSource)
    }, [onSearch, dataSource])

    /**
     * ji
     */
    const onCascaderChangeEvent = useCallback(
      value => {
        onChange?.({
          ...dataSource,
          cascader: value
        })
      },
      [onChange, dataSource]
    )

    const onLoadDataEvent = useCallback((selectedOptions, item) => {
      item.loadData?.(selectedOptions)
    }, [])

    return (
      <div
        className={classNames({
          [styles.aFilter]: true,
          [styles.hasMargin]: !hideMargin
        })}>
        {displayColumns.map((list, listIndex) => {
          return (
            <Row key={listIndex}>
              {list.map(item => {
                const {
                  type,
                  key,
                  label,
                  placeholder,
                  options,
                  align = 'right'
                } = item
                return (
                  <Col
                    key={key}
                    span={8}
                    className={classNames({
                      [styles.aFilterCol]: true,
                      [type]: true,
                      [styles[align]]: true
                    })}>
                    <div
                      className={classNames({
                        [styles.filterLabel]: true,
                        [styles.hide]: ['empty', 'search'].includes(type)
                      })}>
                      <label htmlFor="">{label}</label>
                    </div>

                    <div className={styles.filterControl}>
                      {
                        {
                          empty: null,
                          search: (
                            <Space>
                              <Button onClick={handleClearEvent}>重置</Button>
                              <Button
                                type="primary"
                                onClick={handleSearchEvent}
                                loading={loading}>
                                查询
                              </Button>
                              <Button type="link" onClick={handleExpendEvent}>
                                {columns.length > 2 && (
                                  <>
                                    {isOpen ? '收起' : '展开'}
                                    <UpOutlined
                                      style={{
                                        marginLeft: '0.5em',
                                        transition: 'all 0.3s ease 0s',
                                        transform: `rotate(${
                                          isOpen ? 0 : 0.5
                                        }turn)`
                                      }}
                                    />
                                  </>
                                )}
                              </Button>
                            </Space>
                          ),
                          input: (
                            <Input
                              placeholder={placeholder}
                              allowClear
                              value={dataSource[key]}
                              onChange={e =>
                                onDataChangeEvent(e.target.value, key)
                              }
                            />
                          ),
                          select: (
                            <Select
                              showSearch
                              placeholder={placeholder}
                              value={dataSource[key]}
                              style={{ width: '100%' }}
                              onChange={value => onDataChangeEvent(value, key)}>
                              {options?.map(option => (
                                <Option key={option.value} value={option.value}>
                                  {option.label}
                                </Option>
                              ))}
                            </Select>
                          ),
                          rangePicker: (
                            <ARangePicker
                              separator="至"
                              value={dataSource[`${key}Moment`]}
                              isTimestamp
                              onChange={(dates, dateStrings) =>
                                onRangePickerChangeEvent(
                                  dates,
                                  dateStrings,
                                  key
                                )
                              }
                              format="YYYY-MM-DD"
                            />
                          ),
                          datePicker: (
                            <ADatePicker
                              format="YYYY-MM-DD"
                              value={dataSource[`${key}Moment`]}
                              onChange={(dates, dateString) => {
                                onRangePickerChangeEvent(dates, dateString, key)
                              }}
                            />
                          ),
                          cascader: (
                            <Cascader
                              value={dataSource[key]}
                              options={item.options}
                              changeOnSelect
                              onChange={onCascaderChangeEvent}
                              loadData={selectedOptions =>
                                onLoadDataEvent(selectedOptions, item)
                              }
                            />
                          )
                        }[type]
                      }
                    </div>
                  </Col>
                )
              })}
            </Row>
          )
        })}
      </div>
    )
  }
)

export default AFilter
