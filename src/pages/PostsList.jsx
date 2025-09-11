import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../features/posts/postsSlice'
import {Link} from  'react-router-dom'
import { CgComment, CgProfile } from "react-icons/cg";
import { FaComment } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { MdOutlineReadMore } from "react-icons/md";
import Loading from '../components/Loading';
import { IoMdList } from "react-icons/io";



const PostsList = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {posts, loading, error} = useSelector((state) => state.posts)
    // console.log(posts[5]?.author._id)
    // console.log(user.user.id)
    // console.log(posts)
    
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    if(loading) return <Loading/>
    if(error) return <p>Error: {error}</p>
  return (
    <div className='px-5 min-h-screen'>
        <div className='mt-5 flex flex-col gap-5'>
            <div className='ml-1'>
                <Link to='/myposts'>
                
                <button className='flex items-center bg-white border-2 border-blue-500 px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white'><IoMdList/> My Posts</button>
                </Link>
            </div>
            {
                posts.map((post) => (
                    <Link  key={post._id} to={`/posts/${post._id}`}>
                    <div className='border rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-2'>
                        <div className=''>
                            <div>
                                <div className='flex items-center gap-1'>
                                    <CgProfile className='text-blue-500'/>
                                    <p className='text-gray-600 font-mono'>{post.author.username}</p>
                                    <MdVerified className='text-yellow-500'/>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Posted on {new Date(post.createdAt).toLocaleString()}
                                </p>
                                
                                <div className='mt-5'>
                                        <div className='flex flex-col gap-2'>
                                            <div style={{width:160, height: 107}}>
                                            <img className=' h-20 w-full object-cover rounded-md' src={post.image} alt={post.title} />
                                        </div>
                                        <h1 className='font-bold text-3xl'>{post.title}</h1>
                                        <h3 className='font-semibold text-xl text-gray-500 w-[50%] line-clamp-1'>{post.content}</h3>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='flex items-center gap-3 mt-2'>
                                <div className='flex items-center gap-1'>
                                    <AiOutlineLike className='hover:text-red-500'/>
                                    <p>Like</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaComment className='text-gray-500 size-3.5'/>
                                    <p>Comment</p>
                                </div>
                                <div to={`/posts/${post._id}`} className='flex items-center gap-1'>
                                    <>
                                        <MdOutlineReadMore />
                                        <p className='text-gray-400 hover:text-gray-500'>Read More...</p>
                                    </>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default PostsList