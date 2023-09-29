import React, {useState} from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'

function UploadProfile() { 
const [loading, setLoading] = useState(false) 
const [image, setImage] = useState(null) 

const token = localStorage.getItem('token')  
const navigate = useNavigate()

const HandleUploadProfile = async(e) => { 
  e.preventDefault() 
  try {
   setLoading(true) 
   const formData = new FormData() 
   formData.append("image", image) 
   
   const response = await axios.post('http://localhost:3003/user/profile', formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
       Authorization: `Bearer ${token}`
    }
   })
   if(response.status === 200) {
   navigate('/profile') 
   window.location.reload()
   }
   setLoading(false)
  }catch(err) {
    console.log(err) 
    setLoading(false)
  }
}

  return (
    <div className="mt-3">  
        <form className="flex flex-col gap-y-3" onSubmit={HandleUploadProfile}>
         <input type="file" required accept='image/*' 
         onChange={(e) => setImage(e.target.files[0])}
         /> 
         <button type="submit" className={`${loading ? 'bg-blue-600 text-white rounded-md animate-pulse' : 'bg-blue-600 text-white rounded-md'}`}> 
         {loading ?'uploading...' : 'upload'}
         </button>
        </form>
    </div>
  )
}

export default UploadProfile