import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authAction } from '../feature/auth/authSlice'
import { toast } from 'sonner'

export function useLogout() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  function handleLogOut() {
    dispatch(authAction.logout())
    setTimeout(() => {
      toast.success('Logout successfully')
      navigator('/')
    }, 1000)
  }
  return { handleLogOut }
}
