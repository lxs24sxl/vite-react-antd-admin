import { createStore, applyMiddleware,  compose, AnyAction } from 'redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import loggerModileware from 'redux-logger'
import rootReducer from '@/store/reducers/index'

const { VITE_APP_ENV } = import.meta.env

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __initialState: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const middlewares = [thunkMiddleware]

const isServer = typeof window === 'undefined'

if (process.env.NODE_ENV !== 'production' && !isServer && VITE_APP_ENV === 'dev') {
  middlewares.push(loggerModileware as (ThunkMiddleware<{}, AnyAction, undefined> & {
    withExtraArgument<E>(extraArgument: E): ThunkMiddleware<{}, AnyAction, E>
  }))
}

const enhancer  = composeEnhancers(
  applyMiddleware(...middlewares)
)

const store = createStore(rootReducer, enhancer)

export default store
