import React from 'react'
import {TbError404} from 'react-icons/tb' 
import {Link} from 'react-router-dom'

function NotFound() {
  return (
   <div>
     <div className="flex flex-col items-center my-7  animate-bounce">  
        <span><TbError404 size={150}/></span> 
        <h1 className="text-2xl">NOT FOUND</h1>
    </div> 

    <div className="flex justify-center"> 
    <Link to="/" className="text-lg  bg-blue-600 text-white px-3 py-2">GO HOME</Link>
    </div> 

   </div>
  )
}

export default NotFound