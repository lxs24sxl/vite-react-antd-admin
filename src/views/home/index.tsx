import React, { useCallback } from 'react'
import { useNavigate } from '@/hooks'



const Home = () => {
  const navigate = useNavigate()
  const goToUserList = useCallback(() => {
    navigate('/user/list')
  }, [navigate])

  return (
    <div className="home" onClick={goToUserList}>
      欢迎来到后台
    </div>
  )
}

export default Home
