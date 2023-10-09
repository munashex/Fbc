import {useState, useEffect} from 'react' 
import {FaRegUser} from 'react-icons/fa'   
import {useSelector, useDispatch} from 'react-redux' 
import { getProfile } from '../features/getProfile' 
import axios from 'axios'


function EditProfile() { 
const {profile} = useSelector((state) => state.profile) 
const dispatch = useDispatch()  

const [open, setOpen] = useState(false) 
const [bio, setBio] = useState('') 
const [image, setImage] = useState(null) 
const [loading, setLoading] = useState(false)

useEffect(() => {
dispatch(getProfile())
}, [])

const token = localStorage.getItem("token")

const HandleEditProfile = async (e) => {
  try {
  e.preventDefault()
  setLoading(true) 
  const formData = new FormData() 
  formData.append("image", image) 
  formData.append("bio", bio) 

  const response = await axios.post('https://facebook-kt2g.onrender.com/user/editprofile', formData, {headers: {
    "Content-Type": "multipart/form-data",
     Authorization: `Bearer ${token}`
  }})

  if(response.status === 200) {
   window.location.reload()
  }

  setLoading(false)
  }catch(err) {
   console.log(err) 
   setLoading(false)
  }
}


  return (
    <div> 

    <div className="flex items-center  justify-around"> 
        <h1 className="text-lg font-bold">Profile picture</h1> 
        <button onClick={() => setOpen(true)} className="text-lg font-bold text-blue-600 underline">Add</button> 
    </div> 

    <div>
    {profile?.profile?.image ?  
    (
    < div className="flex justify-center mt-7"> 
      <img src={profile?.profile?.image}  
      className="rounded-full w-32"
      />
    </div> 
    ) :  
    (
   
    <div className="flex justify-center mt-7"> 
       <div className="border p-5 bg-gray-200 rounded-full "> 
       <FaRegUser size={80} color="gray"/> 
       </div>
    </div>
    
    )} 
    </div>

    <form className={`${open ? "mt-9 flex flex-col gap-y-3": 'hidden'}`} onSubmit={HandleEditProfile}> 
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required/>   
        <button type="submit" className={`${loading ? "bg-blue-600 text-lg text-white p-2 animate-pulse": "bg-blue-600 text-lg text-white p-2"}`}> 
        {loading ? 'uploading...' : 'upload'} 
        </button>
    </form>
        
    </div>
  )
}

export default EditProfile