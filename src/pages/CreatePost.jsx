import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {createPost} from '../features/posts/postsSlice'

export const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  if (!user) return <p className='font-mono text-3xl text-gray-600'>You must login to create a post</p>

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({title, content, image}))
      .unwrap()
      .then(()=>{
        navigate('/')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='h-[80vh] flex flex-col items-center justify-center gap-3'>
      <h1 className='text-3xl font-bold text-gray-500'>Create Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-3'>
        <input className='border-2 border-black px-3 py-2' type="text" placeholder='title' value={title}  onChange={(e)=>{setTitle(e.target.value)}} required/>
        <textarea className='border-2 border-black px-3 py-2 w-full' type="text" placeholder='content' value={content}  onChange={(e)=>{setContent(e.target.value)}} required></textarea>
        <input className='border-2 border-black px-3 py-2' type="text" placeholder='image url' value={image}  onChange={(e)=>{setImage(e.target.value)}} required/>
        <button className='bg-black px-4 py-2 w-full text-white font-serif hover:bg-gray-900 hover:translate-y-1 transition-all duration-300' type='submit'>Add Post</button>
      </form>
    </div>
  )
}
