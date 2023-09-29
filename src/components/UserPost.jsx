import {useState, useEffect} from 'react' 
import axios from 'axios'
import {BsThreeDots} from 'react-icons/bs' 
import {useSelector, useDispatch} from 'react-redux' 
import { getProfile } from '../features/getProfile'  
import { getUser } from '../features/getUser' 
import {AiFillLike}  from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'


function UserPost() {  

const [images, setImages] = useState([])  
const [loading, setLoading] = useState(false) 
const [openComment, setOpenComment] = useState(false)

const token = localStorage.getItem('token') 

const {profile} = useSelector((state) => state.profile)   
const {user} = useSelector((state) => state.user) 

const dispatch = useDispatch() 

useEffect(() => {
 dispatch(getProfile())
}, []) 

useEffect(() => {
dispatch(getUser())
}, [])


const getPosts = async () => {
  try {
  setLoading(true) 
  const response = await axios.get('http://localhost:3003/post', {
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
    }
  })
  setImages(response.data) 
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
      {loading ? 
      (
        <div className="space-y-7"> 
        {[1, 2,3].map((item) => (
         <div className="max-w-sm bg-gray-200 animate-pulse md:max-w-lg border p-2 mx-auto h-80"> 
 
         </div>
       ))}
      </div> 
      ) 
       : 
       ( 
       <div className=""> 
        {images?.posts?.map((image) => (
          <div key={image._id} className="my-14">  
            <div className="max-w-lg  mx-auto border-b  md:border md:shadow rounded-md">

            <div className="flex items-center justify-between mx-2"> 
             <div className="flex items-center gap-x-2 p-2"> 
             <img src={profile?.profile?.image} className="w-11 rounded-full"/>
              <h1 className="font-bold">{user?.name}</h1>
             </div> 

             <span>
              <BsThreeDots size={23}/>
             </span>
            </div>  

             <h1 className="mt-2 mx-2">{image?.caption}</h1> 
             
             <div>
              <img src={image?.image} className="w-[100%]"/>
             </div> 

             <div className="flex justify-around my-3">
              <span className="inline-flex items-center gap-x-1"><h1>Like</h1><AiFillLike size={22}/></span> 
              <span className="inline-flex items-center gap-x-1"><h1>comment</h1><FaComment size={22}/></span>
             </div>

             <div className="relative bg-gray-300 p-2 max-w-sm mx-auto my-4 rounded-xl"> 
              <textarea className="w-full border-none outline-none bg-gray-300 placeholder:text-black"
              placeholder="Write a comment" 
              />
             </div>

          </div> 
          </div>
        ))}
       </div> 
       )}
    </div>
  )
}

export default UserPost