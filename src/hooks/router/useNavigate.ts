import { useHistory } from 'react-router'
import { Path } from 'history'

interface NavigateType {
  replace: boolean
}

const useNavigate = (): Function => {
  const history = useHistory()
  return function (
    to: Path,
    { replace }: NavigateType = { replace: false }
  ): void {
    if (replace) {
      history.replace(to)
    } else {
      history.push(to)
    }
  }
}

export default useNavigate
