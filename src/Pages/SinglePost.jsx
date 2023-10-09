import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import Loader from '../components/Loader' 
import axios from 'axios'
import { Link } from 'react-router-dom'


function SinglePost() { 

const {id} = useParams()  
const [loading, setLoading] = useState(false) 
const [post, setPost] = useState({}) 

const getPost = async(postId) => {
    try {
      setLoading(true) 
      const response = await axios.get(`http://localhost:3003/post/${postId}`, {
        headers: {
            "Content-Type": "application/json"
        }
      }) 
      setPost(response.data.post) 
      setLoading(false)
    }catch(err) {
        console.log(err) 
        setLoading(false)
    }
}

useEffect(() => {
getPost(id)
}, [])



  return (
    <div className="mt-7 my-3">
        {loading ?  
        (
        <div className="flex justify-center"> 
          <Loader/>
        </div>
        ) :
        (
        <div className="max-w-md  mx-auto shadow-lg"> 

         <div className="p-2"> 
         <Link to={`/user/${post?.user}`} className="text-lg font-bold  text-blue-600">{post?.name}</Link> 
          <h1>{post?.caption}</h1>
         </div> 

         <img src={post?.image}/>
          
          <div className="flex justify-around my-2 font-bold"> 
             <h1>likes {post?.likes?.length}</h1> 
             <h1>comments {post?.comments?.length}</h1>
          </div>
           
           <h1 className="mx-2 font-bold">comments</h1>
          <div className="mx-2 mb-4 h-36 overflow-y-auto"> 
          {post?.comments && post?.comments.map((user) => (
            <div key={user._id}>
              <Link to={`/user/${user.user}`} className="font-bold">{user?.name}</Link>
              <h1 className="text-slate-600">{user?.comment}</h1> 
              <h1 className="py-1"></h1>
            </div>
          ))}
          </div>

        </div> 
        )}
    </div>
  )
}

export default SinglePost