
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    /**
     * By default, there are two modes in Vite:
     *
     * * `development` is used by vite and vite serve
     * * `production` is used by vite build
     *
     * You can overwrite the default mode used for a command by passing the --mode option flag.
     *
     */
    readonly NODE_ENV: 'development' | 'production' | 'staging'
  }
}

declare let process: NodeJS.Process

declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module 'rc-notification'
declare module 'rmc-notification/lib/index'

interface StringMapType {
  [key: string]: string
}

interface ObjectFunctionType {
  [key: string]: Function
}

interface ObjectAnyType {
  [key: string]: any
}

interface ActionType {
  data: any
  type: string
}

type PoorMansUnknownType = ObjectAnyType | null | undefined | string | number | boolean

type EffectCallback = () => void | (() => void | undefined)

type WithFalse<T> = T | false

type ReactNodeType = React.ReactNode | WithFalse<() => React.ReactNode>

interface IRes {
  dsc: string
  code: number
  data?: any
  t?: number
}
