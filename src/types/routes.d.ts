// interface PathsType {
//   title: string | undefined
//   page: string | undefined
//   redirect?: string | undefined
// }

// interface RouteType2 {
//   paths?: PathsType[]
//   path?: string | undefined
//   page: string | undefined
//   component?: ComponentType<any>
//   exact?: boolean
//   title?: string
//   icon?: string
//   children?: RouteType2[],
//   params?: string,
//   default?: string,
//   isHidden?: boolean,
//   sort?: number
//   redirect?: string,
//   meta?: {
//     roles?: string[]
//   }
// }

export interface NormalRouteType {
  path: string
  meta?: boolean
  exact?: boolean
  component?: any
  code: string
  icon?: any
  name: string
  isHidden?: boolean
  redirect?: string
}

export interface RouteType extends NormalRouteType {
  children?: NormalRouteType[]
}
