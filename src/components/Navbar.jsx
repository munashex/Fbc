import {useEffect, useState} from 'react'  
import {BsFacebook, BsSearch} from 'react-icons/bs'
import {FaBars, FaBullseye, FaLessThanEqual} from 'react-icons/fa6' 
import {PiDotsNineBold} from 'react-icons/pi'  
import {FaLaptopHouse, FaRegUserCircle} from 'react-icons/fa' 
import { Link, useNavigate } from 'react-router-dom' 
import {getProfile} from '../features/getProfile' 
import {useSelector, useDispatch} from 'react-redux'
import {Modal} from 'react-responsive-modal' 
import {BiLogOut} from 'react-icons/bi'



let facebookLogo = 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'

function Navbar() {

  const [open, setOpen] = useState(false)   
  const [openSearch, OpenSearch] = useState(false) 
  const [search, setSearch] = useState('')  
  const navigate = useNavigate() 
  

  
  const onOpenModal = () => setOpen(true) 
  const onCloseModal = () => setOpen(false)  

  const onOpenSearch = () => OpenSearch(true) 
  const onCloseSearch = () => OpenSearch(false)

  const {loading, profile, error} = useSelector((state) => state.profile)  
  const dispatch = useDispatch() 

  useEffect(() => {
  dispatch(getProfile())
  }, [])

  const Logout = () => {
    localStorage.clear() 
    window.location.reload()
  }


  const SearchUser = () => {
    onCloseSearch();
    navigate(`/search/${search}`); 
    window.location.reload()
  };


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
            <button onClick={onOpenSearch} className="bg-gray-200 p-2  rounded-full"><BsSearch size={20}/></button> 
            <button onClick={onOpenModal} className="bg-gray-200 p-2 rounded-full"><FaBars size={20}/></button>
           </div>
        </div> 

        {/* navbar on md and lg screens  */} 

        <div className="hidden shadow-lg md:flex justify-between p-2">

         <div className="flex items-center px-2 gap-x-5"> 
         <Link to="/"><BsFacebook size={50} color="blue"/></Link> 
         <button onClick={onOpenSearch} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><BsSearch size={25}/></button>
         </div> 

         <div className="flex items-center gap-x-5 px-2">
          <button onClick={onOpenModal}  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"><PiDotsNineBold size={25}/></button>
        
           
          {profile?.profile?.image ? (
            <Link to="/profile"> 
              <img src={profile?.profile?.image} className="w-11 rounded-full"/>
            </Link>
          ) : (
             <Link to="/profile" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <FaRegUserCircle size={25}/></Link>
          )}
         </div> 

         <Modal open={open} onClose={onCloseModal} 
      classNames={{modal: 'w-1/2 lg:w-1/5', closeIcon: 'mt-1'}}
      >
        <h1 className=" font-bold">Log Out</h1>
        <div className="mt-4 flex gap-x-2 items-center justify-center">
          <span><BiLogOut size={30}/></span> 
          <button onClick={Logout} className=" bg-blue-600 text-white p-1    hover:bg-black">Log Out</button>
        </div>
      </Modal> 

      <Modal open={openSearch} onClose={onCloseSearch} 
      classNames={{modal: 'w-[90%] md:w-[50%]', closeIcon: 'mt-1'}}
      >
        
        <div className="space-x-3">
         <input className="p-2 rounded-full outline-none w-[60%] lg:w-[60%] bg-gray-200 placeholder:text-slate-600" 
          placeholder="Search Facebook" 
          onChange={(e) => setSearch(e.target.value)}
          /> 
          <button onClick={SearchUser} className="text-white  bg-blue-600 p-2 rounded-md">Search</button>
        </div>  

       

      </Modal> 
        </div>
    </div>
  )
}

export default Navbar