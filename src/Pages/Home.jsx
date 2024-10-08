import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillLike, AiOutlineSend } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

function Home() {
  const token = localStorage.getItem('token'); 
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openComment, setOpenComment] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }

    const getPosts = async () => {
      try {
        const response = await axios.get('https://facebook-kt2g.onrender.com/post/allposts', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setPosts(response.data.posts.reverse());
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getPosts();
  }, [navigate, token]);

  const updatePostLikes = (postId, likes) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post._id === postId ? { ...post, likes } : post
      )
    );
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`https://facebook-kt2g.onrender.com/post/like/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updatePostLikes(postId, response.data.post.likes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.post(`https://facebook-kt2g.onrender.com/post/dislike/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updatePostLikes(postId, response.data.post.likes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(`https://facebook-kt2g.onrender.com/post/comment/${postId}`, { comment }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data.comment] }
            : post
        )
      );
      setComment('');
      setOpenComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <Post />
      {loading ? (
        <div className="space-y-7 ">
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className="max-w-sm bg-gray-200 animate-pulse md:max-w-lg border p-4 mx-auto rounded-md h-80 shadow-md"
            ></div>
          ))}
        </div>
      ) : (
        <div className="max-w-lg  mx-auto">
          {posts.map(post => (
            <div key={post._id} className="border-y md:border md:shadow-lg rounded-md my-11 bg-white">
              <div className="p-4">
                <Link
                  to={`${post.user === userId ? '/profile' : `/user/${post.user}`}`}
                  className="text-lg font-bold text-blue-600 hover:underline"
                >
                  {post?.name}
                </Link>
                <p className="text-gray-800 mt-1">{post?.caption}</p>
              </div>
              <img src={post.image} alt={post.caption} className="w-full rounded-b-lg" />
              <div className="flex justify-between px-4 py-2 font-bold text-gray-600">
                <h1>{post?.likes?.length <= 1 ? 'like' : 'likes'} {post?.likes?.length}</h1>
                <Link
                  to={`/post/${post._id}`}
                  className={`${
                    post?.comments?.length === 0 ? 'invisible' : 'underline text-blue-600 hover:text-blue-800'
                  }`}
                >
                  view {post?.comments?.length <= 1 ? 'comment' : 'comments'}
                </Link>
              </div>
              <div className="flex justify-between px-4 py-2 border-t">
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={() => (post?.likes.includes(userId) ? handleDislike(post?._id) : handleLike(post?._id))}
                >
                  <AiFillLike size={22} className={post?.likes.includes(userId) ? 'text-blue-600' : ''} />
                  <span>{post?.likes.includes(userId) ? 'Dislike' : 'Like'}</span>
                </button>
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={() => setOpenComment(post._id === openComment ? '' : post._id)}
                >
                  <FaComment size={22} />
                  <span>Comment</span>
                </button>
              </div>
              {openComment === post._id && (
                <div className="p-4 bg-gray-100 border-t mt-2 rounded-b-lg">
                  <textarea
                    className="w-full h-20 p-2 border-none outline-none bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      disabled={comment.length <= 1}
                      onClick={() => handleCommentSubmit(post._id)}
                      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                        comment.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <AiOutlineSend size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;




