import {useEffect, useState} from 'react' 
import { getProfile } from '../features/getProfile' 
import {useSelector, useDispatch} from 'react-redux'
import {FaRegUser} from 'react-icons/fa' 
import {Modal} from 'react-responsive-modal'   
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
 
function Post() {  

    const {profile} = useSelector((state) => state.profile) 
    const {user}  = useSelector((state) => state.user)  
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate()

    const dispatch = useDispatch() 

    const [open, setOpen] = useState(false)  
    const [image, setImage] = useState(null) 
    const [caption, setCaption] = useState('')
    
    const onOpenModal = () => setOpen(true) 
    const onCloseModal = () => setOpen(false) 
    const token = localStorage.getItem('token')   
 
    useEffect(() => {
     dispatch(getProfile())
    }, [])

    const PostImage = async(e) => {
    try{
     e.preventDefault() 
     setLoading(true) 
     const formData = new FormData()
    formData.append("image", image) 
    formData.append("caption", caption)

     const response = await axios.post('http://localhost:3003/post', formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
        Authorization: `Bearer ${token}`
      }
     })
     if(response.status === 200) {
      window.location.reload()
      navigate('/')
     }
     setLoading(false)
    }catch(err) {
      console.log(err) 
      setLoading(false)
    }
    }

    

  return (
    <div className="my-3"> 
        <div className="max-w-[95%] md:max-w-2xl border shadow rounded-md p-2 flex justify-between items-center mx-auto">

          {profile?.profile?.image ?  
          (
          <Link to="/profile"> 
           <img src={profile?.profile?.image} className="w-14 rounded-full"/>
          </Link> 
          ) 
          : 
           ( 
           <Link to="/profile" className="inline-flex  bg-gray-200 p-2 rounded-full"> 
              <FaRegUser size={35}/>
           </Link> 
           ) 
          }
 
          <input onClick={onOpenModal} className="border outline-none w-[80%] p-2 rounded-full placeholder:text-lg " 
          placeholder="What's on your mind ?"
          />
        </div> 

        <Modal open={open} onClose={onCloseModal} 
      classNames={{modal: 'w-[90%] md:w-1/3  lg:w-1/3 ', closeIcon: 'mt-1'}} center
      >
        <div>
         <h1 className="text-lg font-bold">Create  post</h1> 

         <div className="flex items-center gap-x-3 mt-3"> 
         {profile?.profile?.image ?  
          (
          <div> 
           <img src={profile?.profile?.image} className="w-11 rounded-full"/>
          </div> 
          ) 
          : 
           ( 
           <div className="inline-flex  bg-gray-200 p-2 rounded-full"> 
              <FaRegUser size={35}/>
           </div> 
           ) 
          }
         <h1 className="text-lg">{user?.name}</h1>
         </div>  

         <form className="mt-9 flex flex-col gap-y-1" onSubmit={PostImage}>
          <input type="file" accept='image/*' required onChange={(e) => setImage(e.target.files[0])}/> 
          <textarea placeholder="caption" className="outline-none placeholder:text-lg" 
          onChange={(e) => setCaption(e.target.value)}/> 
          <button type="submit" 
          className={`${loading ? 'bg-blue-600 text-white p-1 animate-pulse': 'bg-blue-600 text-white p-1'}`}>
            {loading ? "Posting..." : 'Post'}
          </button>
         </form>

        </div> 
      </Modal>

     </div>
  )
}

export default Post