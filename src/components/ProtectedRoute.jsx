import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({Children}) => {
    const {user} = useSelector((state) => state.auth)
    if(!user || !user.token) {
        return <Navigate to='/login' replace/>
    }
 
    return Children
}

export default ProtectedRoute