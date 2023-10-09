import {useState, useEffect} from 'react' 
import axios from 'axios'
import {BsThreeDots} from 'react-icons/bs' 
import {useSelector, useDispatch} from 'react-redux' 
import { getProfile } from '../features/getProfile'  
import { getUser } from '../features/getUser' 
import {AiFillLike}  from 'react-icons/ai'
import {FaComment, FaRegUser } from 'react-icons/fa'
import {Modal} from 'react-responsive-modal'  
import {AiOutlineSend} from 'react-icons/ai' 
import {Link} from 'react-router-dom'

function UserPost() {  

const [images, setImages] = useState([])  
const [loading, setLoading] = useState(false) 
const [open, setOpen] = useState(false)  
const [openComment, setOpenComment] = useState(false) 
const [detelingLoading, setDeletingLoading] = useState(false)

const token = localStorage.getItem('token'); 


const {profile} = useSelector((state) => state.profile)   
const {user} = useSelector((state) => state.user)  

const onOpenModal = () => setOpen(true) 
const onCloseModal = () => setOpen(false) 

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
  const response = await axios.get('https://facebook-kt2g.onrender.com/post', {
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
 
const deletePost = async (postId) => {
  try {
  setDeletingLoading(true)
  const response = await axios.delete(`https://facebook-kt2g.onrender.com/post/${postId}`, {
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status === 200) {
    window.location.reload()
  }
  setDeletingLoading(false)
  }catch(err) {
    console.log(err) 
    setDeletingLoading(false)
  }
}


    
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
       
             {profile?.profile?.image ? <img src={profile?.profile?.image} className="w-11 rounded-full"/> : (
             <span className="bg-gray-200 p-2 rounded-full"> 
              <FaRegUser size={30}/>
             </span>
             )}
              <h1 className="font-bold">{user?.name}</h1>
             </div> 

             <button className="border-none" onClick={onOpenModal}>
              <BsThreeDots size={24}/>
             </button> 

             <Modal open={open} onClose={onCloseModal} 
            classNames={{modal: 'w-1/2 md:w-1/4', closeIcon: 'mt-1'}} center
             >
           <div className="flex  flex-col gap-y-3">
           <h1 className="text-lg font-bold">delete post</h1> 

           <button className={`${detelingLoading ? "bg-red-600 text-lg rounded-full text-white p-2 animate-pulse": 
           "bg-red-600 text-lg rounded-full text-white p-2"}`} onClick={() => deletePost(image?._id)}>
            {detelingLoading ? 'Deleting..': 'Delete'}
           </button>

           </div> 
      </Modal>

            </div>  

             <h1 className="my-2 mx-5">{image?.caption}</h1> 
             
             <div>
              <img src={image?.image} className="w-[100%]"/>
             </div> 

               <div className="flex justify-around font-bold my-2">
                <h1>{image?.likes?.length <= 1 ? 'like' : 'likes'} {image?.likes?.length}</h1>
               <Link to={`/post/${image._id}`} className={`${image?.comments?.length === 0 ? 'invisible' : 'underline text-blue-600'}`}>
               view {image?.comments?.length <= 1 ? 'comment' : 'comments'} 
                </Link>
              </div> 

             

             <div className={`${openComment? "relative bg-gray-200 p-2 max-w-sm mx-auto my-4 rounded-xl": "hidden"}`}> 
              <textarea className="w-full border-none outline-none bg-gray-200 placeholder:text-black"
              placeholder="Write a comment" 
              />

              <button className="absolute bottom-2 right-2"><AiOutlineSend size={20}/></button>
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