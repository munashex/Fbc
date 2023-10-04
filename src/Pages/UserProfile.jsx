import {useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom' 
import axios from 'axios' 
import Loader from '../components/Loader'
import {FaRegUser} from 'react-icons/fa' 

function UserProfile() {
  const [user, setUser] = useState([]) 
  const [loading, setLoading] = useState(false)
  const {id} = useParams() 

 const getUser = async (userId) => {
  try {
  setLoading(true)
  const response = await axios.get(`http://localhost:3003/user/${userId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  setUser(response.data) 
  setLoading(false)
  }catch(err) {
    console.log(err) 
    setLoading(false)
  }
 }

 useEffect(() => {
getUser(id)
 }, [id])

 console.log(user)

  return (
    <div>

      <div className="bg-gradient-to-r from-gray-300 to-slate-300 border relative max-w-2xl mx-auto h-40 md:h-60 md:max-w-2xl">
         <div> 

          <div className='flex md:hidden'>

         {user?.user?.image ? 
         (<div className="absolute -bottom-9 left-5">
          <img src={user?.user?.image} className="w-32 rounded-full"/>
         </div>
         ) :  
         (
        <button  className="absolute -bottom-9 border  left-5 bg-gray-200 p-4 rounded-full">
        <FaRegUser size={80} color="gray"/>
        </button> 
         )}

          <button   className="absolute -bottom-9 right-5 text-lg bg-blue-600 text-white  px-2 rounded-md">
            follow
          </button>

          </div> 

           <div className="hidden md:flex">

           {user?.user?.image ? ( 
            <div className="absolute -bottom-14 left-5"> 
            <img src={user?.user?.image} className="w-32 rounded-full"/>
            </div>
           ) : 
           (
          <button  className="absolute -bottom-14 border left-5 bg-gray-200 p-4 rounded-full">
            <FaRegUser size={80} color="gray"/>
         </button> 
           )} 

          <button  className="absolute font-semibold -bottom-11 left-40 text-lg py-1 px-4 bg-blue-600
           text-white rounded-md "> 
           follow</button>
           </div> 
           
         </div>
       
      </div> 

     
      <div>
        {loading ?  
        (<div className="flex justify-center mt-0 md:mt-9"> 
         <Loader/>
        </div>) 
         : (
         <div className="mt-9 flex md:mt-12 flex-col md:items-center"> 
            <h1 className="text-2xl font-bold ml-6 md:ml-0  md:mr-60 mt-3 uppercase">{user?.post?.name}</h1> 
         </div>  
         )}
      </div> 

      

    </div> 
  )
}

export default UserProfile