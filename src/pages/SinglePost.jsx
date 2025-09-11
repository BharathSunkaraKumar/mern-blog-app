import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, fetchPostById } from '../features/posts/postsSlice'
import Loading from '../components/Loading'

const SinglePost = () => {
    const {id} = useParams()
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {singlePost, loading, error} = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostById(id))
    }, [dispatch, id])

    const handleDelete = () => {
        dispatch(deletePost(singlePost._id))
        navigate('/')
    }

    if(loading) return <Loading/>
    if(error) return <p>error; {error}</p>
    if(!singlePost) return <p>no post found</p>
  return (
    <div className='flex flex-col  justify-evenly items-center gap-5 border-2 rounded-lg p-5 m-5'>
        <p className="text-xs text-gray-500">
            Posted on {new Date(singlePost.createdAt).toLocaleString()}
        </p>
        <div>
            <img className='w-fit rounded-md h-40 object-cover' src={singlePost.image} alt={singlePost.image}/>
        </div>
        <div className='flex flex-col gap-3'>
            <h1 className='text-3xl font-bold'>{singlePost.title}</h1>
            <p className='text-l font-semibold text-gray-500'>{singlePost.content}</p>
        </div>
        <div>
            {
            user && user.user.id === singlePost?.author && (
                <div className='flex gap-3'>
                    <button onClick={()=>navigate(`/editpost/${singlePost._id}`)} className='bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700'>Edit</button>
                    <button onClick={handleDelete} className='bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700'>Delete</button>
                </div>
            )
        }
        </div>
        <div>
            <Link to='/' className='text-blue-500 hover:text-blue-800 font-mono hover:underline'>Back to All Posts</Link>
        </div>
    </div>
  )
}

export default SinglePost