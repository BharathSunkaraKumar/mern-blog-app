import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { use, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../features/auth/authSlice";
import blog from './logo.svg'

const Navbar = () => {
  const[toggle, setToggle] = useState(false)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(user)
  const handleToggle = () => {
    setToggle((prev) => !prev)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    handleToggle()
  }

  return (
    <nav className="flex justify-between h-[55px] items-center bg-white w-full px-10 shadow-md sticky top-0 z-10">
        <div>
            <Link to='/'>
              <img className="w-6" src={blog} alt="logo"/>
            </Link>
        </div>
        <div>
          <p className="font-semibold text-xl text-sky-700">{user?.user.username}</p>
        </div>
        <div className="hidden md:flex space-x-5">
            
          <Link className="hover:bg-blue-100 p-2 rounded-md" to="/create">Create</Link>
            {
              user ? (
                <Link onClick={handleLogout} className="hover:bg-red-100 p-2 rounded-md" to="/register">logout</Link>
              ) : (
                <>
                <Link className="hover:bg-green-100 p-2 rounded-md" to="/login">login</Link>
                <Link className="hover:bg-gray-100 p-2 rounded-md"  to="/register">Register</Link>
                </>
              )
            }
        </div>
        <div className="md:hidden ">
          <div className="relative cursor-pointer">
            <GiHamburgerMenu  onClick={handleToggle}/>
          </div>
          {
            toggle && (
              <div className="flex flex-col absolute right-1 top-10 gap-3 bg-black text-white p-3 rounded-lg shadow-gray-300 shadow-lg">
                <Link onClick={handleToggle} className="hover:bg-blue-700 rounded-md px-2 py-1" to="/create">Create Post</Link>
                {
              user ? (
                <Link onClick={handleLogout} className="hover:bg-red-700 rounded-md px-2 py-1" to="/register">logout</Link>
              ) : (
                <>
                <Link onClick={handleToggle}  className="hover:bg-green-700 rounded-md px-2 py-1" to="/login">login</Link>
                <Link onClick={handleToggle} className="hover:bg-gray-700 rounded-md px-2 py-1"   to="/register">Register</Link>
                </>
              )
            }
              </div>
            )
          }
        </div>
    </nav>
    
  )
}

export default Navbar