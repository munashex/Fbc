import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import { FaHeart, FaComment, FaUser } from 'react-icons/fa'

function SinglePost() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({})

  const getPost = async (postId) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://facebook-kt2g.onrender.com/post/${postId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setPost(response.data.post)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPost(id)
  }, [id])

  return (
    <div className="max-w-2xl mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <Link to={`/user/${post?.user}`} className="flex items-center space-x-3">
              {post?.userImage ? (
                <img src={post.userImage} alt={post?.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
              )}
              <span className="font-semibold text-lg text-blue-600 hover:underline">{post?.name}</span>
            </Link>
            <p className="mt-2 text-gray-700">{post?.caption}</p>
          </div>

          {post?.image && (
            <img src={post.image} alt="Post" className="w-full object-cover max-h-96" />
          )}

          <div className="flex justify-around p-4 border-b">
            <div className="flex items-center space-x-2">
              <FaHeart className="text-red-500" />
              <span className="font-semibold">{post?.likes?.length} likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaComment className="text-blue-500" />
              <span className="font-semibold">{post?.comments?.length} comments</span>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Comments</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {post?.comments && post.comments.map((user) => (
                <div key={user._id} className="border-b pb-2">
                  <Link to={`/user/${user.user}`} className="font-semibold text-blue-600 hover:underline">{user?.name}</Link>
                  <p className="text-gray-700 mt-1">{user?.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SinglePost