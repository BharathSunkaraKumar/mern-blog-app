import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPostById, updatePost } from '../features/posts/postsSlice'

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {singlePost} = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostById(id))
    },[dispatch, id])

    useEffect(() => {
        if(singlePost) {
            setTitle(singlePost.title)
            setContent(singlePost.content)
        }
    }, [singlePost])

    const hanldeSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePost({id, postData: {title, content}}))
        navigate(`/posts/${id}`)
    }
  return (
    <div className='flex flex-col justify-center items-center gap-3 h-[80vh]'>
        <h1>EditPost</h1>
        <form onSubmit={hanldeSubmit} className='flex flex-col justify-center items-center gap-3'>
            <input className='border-2 border-black px-5 py-3' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea className='border-2 border-black w-[220px] px-11 py-3' type="text" value={content} onChange={(e) => setContent(e.target.value)} required >

            </textarea>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 rounded-lg w-full px-4 py-2'>Update</button>
        </form>
    </div>
  )
}

export default EditPost