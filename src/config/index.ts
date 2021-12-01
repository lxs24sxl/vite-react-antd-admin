const { VITE_APP_HOST, VITE_APP_API } = import.meta.env

export const URI_BASE = `${VITE_APP_API}/server`

export const PROJECT_BASE = `${VITE_APP_HOST}/#/`

export const UPLOAD_URL = `${URI_BASE}/manager/file/upload/`
