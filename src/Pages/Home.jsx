import {useEffect, useState} from 'react' 
import {useNavigate} from 'react-router-dom' 
import Post from '../components/Post'
import axios from 'axios' 
import {Link} from 'react-router-dom'
import {AiFillLike, AiOutlineSend}  from 'react-icons/ai'
import {FaComment } from 'react-icons/fa'


const token = localStorage.getItem('token')

function Home() {

const navigate = useNavigate() 

const [posts, setPosts] = useState([]) 
const [loading, setLoading] = useState(false) 
const [openComment, setOpenComment] = useState(false) 




 

const getPosts = async () => {
  try {
    setLoading(true)
  const response = await axios.get(' http://localhost:3003/post/allposts', {headers: {
    "Content-Type": "application/json"
  }})
  setPosts(response.data.posts) 
  setLoading(false)
  }catch(err) {
   console.log(err) 
   setLoading(false)
  } 
}

useEffect(() => {
getPosts()
}, [])




  return (
    <div>
      <Post/> 
     
     {loading ?
      (
        <div className="space-y-7 mt-9"> 
        {[1, 2,3].map((item) => (
         <div className="max-w-sm bg-gray-200 animate-pulse md:max-w-lg border p-2 mx-auto h-80"> 
 
         </div>
       ))}
      </div>
      ) : 
      (
      <div className="max-w-lg mt-9 mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="border-y  md:border md:shadow rounded-md my-11"> 
            <div className="space-y-1 p-2"> 
            <Link  className="text-lg font-bold text-blue-600">{post?.name}</Link>
            <h1>{post?.caption}</h1>
            </div>
            <img src={post.image} className="w-[100%]"/> 

            <div className="flex justify-around my-3">
              <span className="inline-flex items-center gap-x-1"><h1>Like</h1><AiFillLike size={22}/></span> 
              <button onClick={() => setOpenComment(!openComment)} className="inline-flex items-center gap-x-1 border-none"><h1>comment</h1><FaComment size={22}/></button>
             </div>

              
             <div className={`${openComment? "relative bg-gray-200 p-2 max-w-sm mx-auto my-4 rounded-xl": "hidden"}`}> 
              <textarea className="w-full border-none outline-none bg-gray-200 placeholder:text-black"
              placeholder="Write a comment" 
              />

              <button className="absolute bottom-2 right-2"><AiOutlineSend size={20}/></button>
             </div>
          </div>
        ))}
      </div> 
      )}
      
    </div>
  )
}

export default Home