import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchPostById } from '../features/posts/postsSlice'

const SinglePost = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {singlePost, loading, error} = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostById(id))
    }, [dispatch, id])
    console.log(singlePost)
    
    if(loading) return <p>:oading...</p>
    if(error) return <p>error; {error}</p>
    if(!singlePost) return <p>no post found</p>
  return (
    <div className='flex flex-col  justify-evenly items-center gap-5 border-2 rounded-lg p-5 m-5'>
        <div>
            <img className='w-fit rounded-md h-40 object-cover' src={singlePost.image} alt={singlePost.image}/>
        </div>
        <div className='flex flex-col gap-3'>
            <h1 className='text-3xl font-bold'>{singlePost.title}</h1>
            <h3 className='text-xl font-semibold text-gray-500'>{singlePost.content}</h3>
        </div>
        <div>
            <Link to='/' className='text-blue-500 hover:text-blue-800 font-mono hover:underline'>Back to All Posts</Link>
        </div>
    </div>
  )
}

export default SinglePost