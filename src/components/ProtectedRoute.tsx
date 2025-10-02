import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const loginContext = useContext(LoginContext)
  const { isLoggedIn, isLoading, setShowLoginModal } = loginContext || { isLoggedIn: false, isLoading: true, setShowLoginModal: () => {} }
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setShowLoginModal(true)
    }
  }, [isLoading, isLoggedIn, setShowLoginModal])

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!isLoggedIn) {
    return null // Modal will handle the login
  }

  return <>{children}</>
}

export default ProtectedRoute
