import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetail from './pages/PostDetail'
import { CreatePost } from './pages/CreatePost'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div >
      
    <Router >
      <Layout/>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/posts/:id' element={<PostDetail/>} />
        
        <Route path='/create' element={
          <ProtectedRoute>
            <CreatePost/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App