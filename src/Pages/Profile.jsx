import React from 'react'  
import {FaRegUser} from 'react-icons/fa' 
import {useState, useEffect} from 'react' 
import {Modal} from 'react-responsive-modal' 
import {AiOutlineCamera} from 'react-icons/ai'  
import UploadProfile from '../components/UploadProfile' 
import { getUser } from '../features/getUser'  
import { getProfile } from '../features/getProfile'
import {useSelector, useDispatch} from 'react-redux'  
import Loader from '../components/Loader' 
import {HiPencil} from 'react-icons/hi2' 
import { useNavigate } from 'react-router-dom' 
import EditProfile from '../components/EditProfile' 
import Post from '../components/Post'
import UserPost from '../components/UserPost'
import axios from 'axios'
import { Link } from 'react-router-dom'

 

function Profile() {

  const [open, setOpen] = useState(false)  
  const [openEdit, setOpenEdit] = useState(false) 
  const [openFollowing, setOpenFollowing] = useState(false) 
  const [openFollowers, setOpenFollowers] = useState(false)
  const [following, setFollowing] = useState([]) 
  const [followers, setFollowers] = useState([])
  const [loadingFollowing, setLoadingFollowing] = useState(false)
  const [loadingFollowers, setLoadingFollowers] = useState(false)


  

  const onOpenModal = () => setOpen(true) 
  const onCloseModal = () => setOpen(false)   

  const onOpenEdit = () => setOpenEdit(true) 
  const onCloseEdit = () => setOpenEdit(false)

  const onOpenFollowing = () => setOpenFollowing(true) 
  const onCloseFollowing = () => setOpenFollowing(false)

  const onOpenFollowers = () => setOpenFollowers(true) 
  const onCloseFollowers = () => setOpenFollowers(false)

  

  const navigate = useNavigate()

  const {loading, user, error} = useSelector((state) => state.user)  
  const {profile} = useSelector((state) => state.profile)
  const dispatch = useDispatch()  

  const token = localStorage.getItem('token'); 
  const userId = localStorage.getItem('userId')
  

  useEffect(() => {
  dispatch(getUser())
  }, [])

  
  useEffect(() => {
   dispatch(getProfile())
  }, [])

  useEffect(() => {
   if(!token) {
    navigate('/signin')    
   }
  }, [])
  
  
 
  const getFollowing = async(_id) => {
  try {
    setLoadingFollowing(true)
 const response = await axios.get(`http://localhost:3003/user/following/${_id}`) 
  setFollowing(response.data.following) 
  setLoadingFollowing(false)
  }catch(err) {
    console.log(err)
    setLoadingFollowing(false)
  }
  }
  
  useEffect(() => {
  getFollowing(userId)
  }, []) 

  const getFollowers = async(_id) => {
    try {
    setLoadingFollowers(true)
   const response = await axios.get(`http://localhost:3003/user/followers/${_id}`) 
    setFollowers(response.data.followers) 
    setLoadingFollowers(false)
    }catch(err) {
      console.log(err) 
      setLoadingFollowers(false)
    }
    }

    useEffect(() => {
      getFollowers(userId)
      }, []) 
    
  

  return (
    <div>

      <div className="bg-gradient-to-r from-gray-300 to-slate-300 border relative max-w-2xl mx-auto h-40 md:h-60 md:max-w-2xl">
         <div> 

          <div className='flex md:hidden'>

         {profile?.profile?.image ? 
         (<div className="absolute -bottom-9 left-5">
          <img src={profile?.profile?.image} className="w-32 rounded-full"/>
         </div>
         ) :  
         (
        <button onClick={onOpenModal} className="absolute -bottom-9 border  left-5 bg-gray-200 p-4 rounded-full">
        <FaRegUser size={80} color="gray"/>
        </button> 
         )}

          <button onClick={onOpenEdit}  className="absolute -bottom-9 right-5 inline-flex items-center gap-x-2 text-lg bg-blue-600 text-white  px-2 rounded-md">
            <HiPencil size={20}/> 
            Edit profile
          </button>

          </div> 

           <div className="hidden md:flex">

           {profile?.profile?.image ? ( 
            <div className="absolute -bottom-14 left-5"> 
            <img src={profile?.profile?.image} className="w-32 rounded-full"/>
            </div>
           ) : 
           (
          <button onClick={onOpenModal} className="absolute -bottom-14 border left-5 bg-gray-200 p-4 rounded-full">
            <FaRegUser size={80} color="gray"/>
         </button> 
           )} 

          <button onClick={onOpenEdit} className="absolute font-semibold -bottom-11 left-40 text-lg py-1 px-4 bg-blue-600
           text-white rounded-md inline-flex items-center gap-x-2"> 
           <HiPencil size={20}/>
           Edit Profile</button>
           </div> 
           
         </div>
       
      </div> 

      
      <Modal open={open} onClose={onCloseModal} 
      classNames={{modal: 'w-[90%] md:w-1/3  lg:w-1/4 ', closeIcon: 'mt-1'}} center
      >
        <div className="flex items-center gap-x-2">
         <span><AiOutlineCamera size={30}/></span> 
         <h1>choose profile pic</h1>
        </div> 
        <UploadProfile/>
      </Modal>

      <Modal open={openEdit} onClose={onCloseEdit} 
       classNames={{modal: 'w-[90%]   lg:w-1/2', closeIcon: 'mt-1'}} 
      >
      <EditProfile/>
      </Modal>


      <div>
        {loading ?  
        (<div className="flex justify-center mt-0 md:mt-9"> 
         <Loader/>
        </div>) 
         : (
         <div className="mt-9 flex md:mt-12 flex-col md:items-center"> 
            <h1 className="text-2xl font-bold ml-6 md:ml-0  md:mr-60 mt-3 uppercase">{user?.name}</h1> 
         </div>  
         )}
      </div> 

      <div className="max-w-sm mx-auto font-bold text-lg flex justify-center gap-x-8 my-9">
       <button onClick={onOpenFollowers}>Followers {followers && followers?.length}</button> 
       <button onClick={onOpenFollowing}>Following {following && following?.length}</button>
      </div>

      <Modal open={openFollowing} onClose={onCloseFollowing}
      classNames={{modal: 'w-[90%] md:w-1/2  lg:w-1/2 ', closeIcon: 'mt-1'}} center
      >
       <h1 className="text-lg font-bold">Following</h1> 
       
       {loadingFollowing ? (
        <div className="flex justify-center"> 
          <Loader/>
        </div>
      ) : (
        <div className="flex flex-col mt-5 gap-y-5">
        {following && following.map((item) => (
          <Link to={`/user/${item.user}`} key={item._id} className="flex items-center gap-x-3">
            <img src={item.image} className="w-16 rounded-full"/> 
            <h1 className="font-bold text-lg">{item.name}</h1>
          </Link>
        ))}
      </div> 
      )}
    
      </Modal> 


      <Modal open={openFollowers} onClose={onCloseFollowers}
      classNames={{modal: 'w-[90%] md:w-1/2  lg:w-1/2 ', closeIcon: 'mt-1'}} center
      >
       <h1 className="text-lg font-bold">Followers</h1> 
       
       {loadingFollowers ? (
        <div className="flex justify-center"> 
          <Loader/>
        </div>
      ) : (
        <div className="flex flex-col mt-5 gap-y-5">
        {following && following.map((item) => (
          <Link to={`/user/${item.user}`} key={item._id} className="flex items-center gap-x-3">
            <img src={item.image} className="w-16 rounded-full"/> 
            <h1 className="font-bold text-lg">{item.name}</h1>
          </Link>
        ))}
      </div> 
      )}
    
      </Modal> 


      <Post/> 
      <UserPost/>

    </div> 
  )
}

export default Profile