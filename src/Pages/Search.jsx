import React from 'react' 
import { useParams } from 'react-router-dom' 
import {useState, useEffect} from 'react' 
import axios from 'axios' 
import Loader from '../components/Loader'  
import { Link } from 'react-router-dom'


function Search() { 

    const {name} = useParams() 

    const [user, setUser] = useState({})   
    const [loading, setLoading] = useState(false)  

    const userId = localStorage.getItem('userId')
    

    const getUser = async (username) => {
     try {
    setLoading(true)
     const response = await axios.get(`http://localhost:3003/user/search/${username}`)
      setUser(response.data.user) 
      setLoading(false)
    }catch(err) {
    console.log(err.response.data.message) 
        setLoading(false)
     }
    }

    useEffect(() => {
     getUser(name)
    }, [name])

    


  return (
    <div className="my-8">
        {loading ? 
         ( 
         <div className="flex justify-center"> 
           <Loader/>
         </div> 
         ) 
        : ( 
            <div className="flex flex-col items-center gap-y-2  p-3 ">  

             <Link to={`${user.user === userId ? '/profile' : `/user/${user.user}`}`}>
            <img src={user.image} className="rounded-full w-20"/>  
             </Link> 

            <h1 className="font-bold text-lg">{user.name || 'User Not Found'}</h1> 
              </div> 
        )}  

       
    </div>
  )
}

export default Search