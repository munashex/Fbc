import {useEffect} from 'react'  
import {BsFacebook, BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa6' 
import {PiDotsNineBold} from 'react-icons/pi' 
import {IoMdNotifications} from 'react-icons/io' 
import {FaRegUserCircle} from 'react-icons/fa' 
import { Link } from 'react-router-dom' 
import {getProfile} from '../features/getProfile' 
import {useSelector, useDispatch} from 'react-redux'


let facebookLogo = 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'

function Navbar() {

  const {loading, profile, error} = useSelector((state) => state.profile)  
  const dispatch = useDispatch() 

  useEffect(() => {
  dispatch(getProfile())
  }, [])



  return (
    <div>
        {/* navbar on sm screens  */}
        <div className="flex md:hidden item-center justify-between p-2" >
           
           <Link to="">
           <img src={facebookLogo} 
            alt="facebook" 
            className="w-40"
            />  
            </Link>

           <div className="flex items-center gap-x-5 px-2"> 
            <span className="bg-gray-200 p-2  rounded-full"><BsSearch size={20}/></span> 
            <span className="bg-gray-200 p-2 rounded-full"><FaBars size={20}/></span>
           </div>
        </div> 

        {/* navbar on md and lg screens  */} 

        <div className="hidden shadow-lg md:flex justify-between p-2">

         <div className="flex items-center px-2 gap-x-5"> 
         <Link to="/"><BsFacebook size={50} color="blue"/></Link> 
         <span className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><BsSearch size={25}/></span>
         </div> 

         <div className="flex items-center gap-x-5 px-2">
          <span className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><PiDotsNineBold size={25}/></span>
          <span className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><IoMdNotifications size={25}/></span>
           
          {profile?.profile?.image ? (
            <Link to="/profile"> 
              <img src={profile?.profile?.image} className="w-11 rounded-full"/>
            </Link>
          ) : (
             <Link to="/profile" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <FaRegUserCircle size={25}/></Link>
          )}
         </div> 

        </div>
    </div>
  )
}

export default Navbar