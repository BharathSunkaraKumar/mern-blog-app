import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { use, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../features/auth/authSlice";

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
    <nav className="flex justify-between shadow-md h-[55px] items-center px-4 py-2">
        <div>
            <Link to='/'>Logo</Link>
        </div>
        <div>
          <p className="font-semibold text-xl text-sky-700">{user?.user.username}</p>
        </div>
        <div className="hidden md:flex space-x-5">
            
            {
              user ? (
                <Link onClick={handleLogout} className="hover:bg-gray-100 p-2 rounded-md" to="/logout">logout</Link>
              ) : (
                <>
                <Link className="hover:bg-gray-100 p-2 rounded-md" to="/login">login</Link>
                <Link className="hover:bg-gray-100 p-2 rounded-md"  to="/register">Register</Link>
                </>
              )
            }
            <Link className="hover:bg-gray-100 p-2 rounded-md" to="/create">Create</Link>
        </div>
        <div className="md:hidden ">
          <div className="relative cursor-pointer">
            <GiHamburgerMenu  onClick={handleToggle}/>
          </div>
          {
            toggle && (
              <div className="flex flex-col absolute right-1 top-10 gap-3 bg-black text-white p-3 rounded-lg shadow-gray-300 shadow-lg">
                {
              user ? (
                <Link onClick={handleLogout} className="hover:bg-gray-700 rounded-md px-2 py-1" to="/register">logout</Link>
              ) : (
                <>
                <Link onClick={handleToggle}  className="hover:bg-gray-700 rounded-md px-2 py-1" to="/login">login</Link>
                <Link onClick={handleToggle} className="hover:bg-gray-700 rounded-md px-2 py-1"   to="/register">Register</Link>
                </>
              )
            }
                <Link onClick={handleToggle} className="hover:bg-gray-700 rounded-md px-2 py-1" to="/create">Create</Link>
              </div>
            )
          }
        </div>
    </nav>
  )
}

export default Navbar