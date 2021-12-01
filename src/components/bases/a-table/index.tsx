import {
  Card,
  Dropdown,
  Menu,
  PaginationProps,
  Skeleton,
  Space,
  Table,
  TableProps,
  Tooltip
} from 'antd'
import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { SizeType } from 'antd/lib/config-provider/SizeContext'
import classNames from 'classnames'

import {
  ReloadOutlined,
  ColumnHeightOutlined
  // SettingOutlined
} from '@ant-design/icons'
import { ARequestApiNoParamsType, ARequestApiType } from '@/types/services'

import styles from './index.module.less'

type useATableParamsType = {
  listApi: ARequestApiType<any> | ARequestApiNoParamsType
  listCountApi?: ARequestApiType<any> | ARequestApiNoParamsType
  config?: ObjectAnyType
  hasCount?: boolean
}

/**
 * 物理分页
 * @param {Array} list 数组
 * @param {Number} currentPage 当前页
 * @param {Number} pageSize 页显示数量
 * @returns 分页数据
 */
const getFormatData = (list: any, currentPage: number, pageSize: number) => {
  return list.slice((currentPage - 1) * pageSize, pageSize * currentPage)
}

export const useATable = (params: useATableParamsType) => {
  const { listApi, listCountApi, hasCount = true } = params || {}
  const [config, setConfig] = useState<ObjectAnyType>(params?.config || {})
  // 加载
  const [allLoading, setLoading] = useState(false)
  const [listLoading, setListLoading] = useState(false)
  // 表格数据
  const [tableList, setTableList] = useState([])
  const tableListRef = useRef(tableList || [])
  /** 数据总数 */
  const [allTableList, setAllTableList] = useState([])
  // 总数
  const [total, setTotal] = useState<number>(0)
  const configRef = useRef(config)

  // 暴露的接口值
  const loading = useMemo(() => {
    return allLoading || listLoading
  }, [allLoading, listLoading])

  /**
   * 获取列表
   */
  const queryListEvent = useCallback(() => {
    if (!listApi) return Promise.reject()
    setListLoading(true)
    const tempConfigRef = configRef.current

    const api = tempConfigRef
      ? listApi(tempConfigRef)
      : (listApi as ARequestApiNoParamsType)()
    return api
      .then(({ data }) => {
        tableListRef.current = data as any
        setTableList(
          getFormatData(
            data as any,
            (tempConfigRef.currentPage as number) || 1,
            (tempConfigRef.pageSize as number) || 20
          )
        )
        setAllTableList(hasCount ? [] : (data as any) || [])

        if (hasCount) {
          setTotal((data as Array<any>).length)
        }
        setListLoading(false)
      })
      .catch(() => {
        setListLoading(false)
      })
  }, [listApi, hasCount])

  /**
   * 查询总数
   */
  const queryListCountEvent = useCallback(() => {
    if (!listCountApi) return Promise.reject()
    const api = configRef.current
      ? listCountApi(configRef.current)
      : (listCountApi as ARequestApiNoParamsType)()
    return api.then(({ data }) => {
      setTotal(data as number)
    })
  }, [listCountApi])

  /**
   * 查询列表和总数接口
   */
  const initList = useCallback(async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const list = [queryListEvent()]
        if (hasCount) {
          list.push(queryListCountEvent())
        }
        setLoading(true)
        await Promise.all(list)
        setLoading(false)
        resolve(true)
      } catch (error) {
        setLoading(false)
        reject(error)
      }
    })
  }, [queryListCountEvent, queryListEvent, hasCount])

  /**
   * 导航栏改变事件
   */
  const onPaginationChangEvent = useCallback(
    (currentPage, pageSize) => {
      setConfig({
        ...configRef.current,
        currentPage,
        pageSize
      })
      if (hasCount) {
        queryListEvent()
      } else {
        setLoading(true)
        setTimeout(() => {
          setTableList(
            getFormatData(tableListRef.current, currentPage, pageSize)
          )
          setLoading(false)
        }, 13)
      }
    },
    [queryListEvent, hasCount]
  )

  /**
   * 筛选事件
   */
  const onFilterChangeEvent = useCallback(data => {
    setConfig(data)
  }, [])

  /**
   * 筛选搜索事件
   */
  const onFilterSearchEvent = useCallback(() => {
    initList()
  }, [initList])

  useEffect(() => {
    configRef.current = params.config as ObjectAnyType
  }, [params.config])

  useEffect(() => {
    configRef.current = config
  }, [config])

  return {
    config,
    loading,
    tableList,
    total,
    allTableList,
    setConfig,
    onPaginationChangEvent,
    queryListEvent,
    queryListCountEvent,
    initList,
    setLoading,
    setListLoading,

    onFilterChangeEvent,
    onFilterSearchEvent
  }
}

export type ATableType = Omit<TableProps<ObjectAnyType>, 'title'> & {
  title?: string
  total?: number
  onPaginationChange?: (page: number, pageSize?: number) => void
  onChange?: () => void
  headRightCompoennt?: ReactNode | ReactNode[]
  onRefresh?: () => void
  hideMargin?: boolean
}

/**
 * 表格
 * @param {string} title 标题
 * @param {ReactNode} headRightCompoennt 顶部slot组件
 * @param {Function} onRefresh 刷新事件
 * @param {boolean} hideMargin 隐藏边距
 * 其余参照antd table
 */
const ATable: FC<ATableType> = memo(
  ({
    title = '查询表格',
    total,
    onPaginationChange,
    onChange,
    onRefresh,
    headRightCompoennt = null,
    hideMargin = false,
    ...restProps
  }) => {
    const { loading } = restProps
    const [size, setSize] = useState<SizeType>(undefined)
    /** 分页 */
    const pagination: PaginationProps = useMemo(() => {
      return {
        size: 'small',
        showTotal: (totalCount, range) =>
          `第 ${range[0]}-${range[1]} 条/总共 ${totalCount} 条`,
        defaultPageSize: 20,
        defaultCurrent: 1,
        showSizeChanger: true,
        total,
        onChange: (page, pageSize) => {
          onPaginationChange?.(page, pageSize)
          onChange?.()
        }
      }
    }, [total, onPaginationChange, onChange])

    const onMenuSelectEvent = useCallback(({ key }) => {
      setSize(key)
    }, [])

    const menu = (
      <Menu
        onClick={onMenuSelectEvent}
        selectedKeys={size ? [size] : ['default']}>
        <Menu.Item key="default">默认</Menu.Item>
        <Menu.Item key="middle">中等</Menu.Item>
        <Menu.Item key="small">紧凑</Menu.Item>
      </Menu>
    )

    return (
      <Card
        bordered={false}
        className={classNames({
          [styles.aTable]: true,
          [styles.hasMargin]: !hideMargin
        })}>
        <div className={styles.aTableToolbar}>
          <div className={styles.toolbarLeft}>{title}</div>
          <div className={styles.toolbarRight}>
            <Space size="middle">
              {headRightCompoennt}

              <Tooltip placement="top" title="刷新">
                <ReloadOutlined onClick={onRefresh} />
              </Tooltip>

              <Tooltip placement="top" title="密度">
                <Dropdown overlay={menu} trigger={['click']}>
                  <ColumnHeightOutlined />
                </Dropdown>
              </Tooltip>

              {/* <Tooltip placement="top" title="设置">
                <SettingOutlined />
              </Tooltip> */}
            </Space>
          </div>
        </div>

        <div className="a-table-content">
          <Skeleton loading={(loading as boolean) || false} active>
            <Table {...restProps} size={size} pagination={pagination} />
          </Skeleton>
        </div>
      </Card>
    )
  }
)

export default ATable
