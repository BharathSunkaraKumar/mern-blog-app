import React, { useEffect, useState } from 'react'
import { loginUser } from '../features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error, user} = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  useEffect(() => {
    if(user && user.token) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className='h-[90vh] w-full flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text-blue-500 mb-3'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-3'>
        {/* <input className='border-2 border-black px-5 py-3' onChange={handleChange} value={formData.user} name='username' type="text" placeholder='Username' /> */}
        <input className='border-2 border-black px-5 py-3' onChange={handleChange} value={formData.email} name='email' type="email" placeholder='email' />
        <input className='border-2 border-black px-5 py-3' onChange={handleChange} value={formData.password} name='password' type="password" placeholder='password' />
        <button type='submit' className='bg-black text-white w-full h-10 rounded-md hover:bg-gray-900'>{loading ? "Processing... " : "login"}</button>
      </form>
      <Link className='text-blue-800 hover:underline mt-2 w-fit' to='/register'>you don't have account. Please register</Link>
    </div>
  )
}

export default Login