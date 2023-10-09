import axios from 'axios'
import { useState, useEffect } from 'react' 
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Register() {  
    const fbLogo = 'https://static.xx.fbcdn.net/rsrc.php/yu/r/dyZbZB6M64R.svg' 
    
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')  
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate()
    
    const token = localStorage.getItem('token') 

    useEffect(() => {
    if(token) {
      navigate('/')
    }
    }, [])
  

    const RegisterUser = async(e) => { 
        e.preventDefault()
        try {
        setLoading(true) 
        const response = await axios.post('https://facebook-kt2g.onrender.com/api/signup', {name, email, password} , {
            headers: {
                "Content-Type": "application/json"
            }
        })  
            navigate('/signin') 
            window.location.reload()
            setLoading(false)
        }catch(err) {
            toast.error(err.response.data.message) 
             setLoading(false)
        } 

    }



  return (
    <div>
        <div className="flex flex-col items-center">
            <img src={fbLogo}  
            className="w-40 md:w-44"
            /> 
        </div> 

        <div className="max-w-sm md:max-w-lg mx-auto  py-7 mt-3 border">
        <form className="flex flex-col items-center gap-y-4" onSubmit={RegisterUser}> 

        <input className="border w-[90%] p-1 outline-blue-600" placeholder="name" 
        onChange={(e) => setName(e.target.value)} 
        required
        /> 
        <input className="border w-[90%] p-1 outline-blue-600" placeholder="email" 
        onChange={(e) => setEmail(e.target.value)} 
        required
        /> 
        <input className="border w-[90%] p-1 outline-blue-600" placeholder="password"  
        onChange={(e) => setPassword(e.target.value)} 
        required
        /> 

        <button type="submit" className={`${loading ? 'bg-blue-600 text-white w-[90%] p-1 animate-pulse': 
        'bg-blue-600 text-white w-[90%] p-1'}`}> 
        Sign Up
        </button>
        </form>
        </div> 
    </div>
  )
}

export default Register