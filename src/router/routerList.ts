import home from './routes/home'
// import design from './routes/design'
import user from './routes/user'
import error from './routes/error'
import meterial from './routes/meterial'
import login from './routes/login'

import { RouteType } from '@/types/routes'

const routerList: RouteType[] = [
  ...home,

  ...user,
  ...meterial,

  ...error,
  ...login
  // ...design
  // { path: '/login', component: Login },
  // { path: '/user', component: Users, children: user }
]

export default routerList
