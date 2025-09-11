import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { fetchPosts } from '../features/posts/postsSlice'
import { Link } from 'react-router-dom'
import { AiOutlineLike } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa6'
import { MdOutlineReadMore, MdVerified } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const MyPosts = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {posts, loading, error} = useSelector((state) => state.posts)
  // console.log(posts)
  const filterPosts = posts.filter((post) => {
      return post?.author._id == user.user.id
  })
  useEffect(() => {
      dispatch(fetchPosts())
  }, [dispatch])

  if(loading) return <Loading/>

  return (
    <div>
      <h1 className='text-2xl font-bold my-5 ml-2 text-blue-600'>My Posts</h1>
      <div>
        {
          filterPosts.map((filterpost) => (
            <Link  key={filterpost._id} to={`/posts/${filterpost._id}`}>
                    <div className='border rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-2'>
                        <div className=''>
                            <div>
                                <div className='flex items-center gap-1'>
                                    <CgProfile className='text-blue-500'/>
                                    <p className='text-gray-600 font-mono'>{filterpost.author.username}</p>
                                    <MdVerified className='text-yellow-500'/>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Posted on {new Date(filterpost.createdAt).toLocaleString()}
                                </p>
                                <div className='flex justify-between items-center mt-2'>
                                    <div className='flex flex-col gap-2 mt-2 mb-2'>
                                        <h1 className='font-bold text-3xl'>{filterpost.title}</h1>
                                        <h3 className='font-semibold text-xl text-gray-500 w-[50%] line-clamp-1'>{filterpost.content}</h3>
                                    </div>
                                    <div>
                                        <img className=' h-20 object-cover w-[250px] rounded-md' src={filterpost.image} alt={filterpost.title} />
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
                                <div to={`/posts/${filterpost._id}`} className='flex items-center gap-1'>
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

export default MyPosts