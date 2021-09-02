import { useLocation } from 'react-router'
import qs from 'qs'

interface ObjectAnyType {
  [key: string]: any
}

const useQuery = (): ObjectAnyType | null | undefined => {
  const location = useLocation()

  return qs.parse(decodeURIComponent(location.search.replace('?', '')))
}

export default useQuery
