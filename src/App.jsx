import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { CreatePost } from './pages/CreatePost'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import SinglePost from './pages/SinglePost'
import EditPost from './pages/EditPost'
import MyPosts from './pages/MyPosts'

const App = () => {
  return (
    <div >
      
    <Router >
      <Navbar/>
      <div className='max-w-7xl mx-auto px-6 m-5 rounded-lg'>
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/posts/:id' element={<SinglePost/>} />
        <Route path='/myposts' element={<MyPosts/>}/>
        <Route path='/create' element={
          
            <CreatePost/>
        } />
        <Route path='/editpost/:id' element={
          <EditPost/>
        } />
      </Routes>
      </div>
    </Router>
    </div>
    
  )
}

export default App