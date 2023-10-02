import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() { 

 
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
 
    const LoginUser = async(e) => { 
        e.preventDefault()
        try {
        setLoading(true) 
        const response = await axios.post('http://localhost:3003/api/signin', { email, password} , {
            headers: {
                "Content-Type": "application/json"
            }
        })  
            const {token, user} = response.data 
            localStorage.setItem("token", token)    
            localStorage.setItem("userId", user)
            navigate('/')
            window.location.reload()
            setLoading(false) 
        }catch(err) {
         toast.error(err.response.data.message) 
        setLoading(false)
        }
    }


    const fbLogo = 'https://static.xx.fbcdn.net/rsrc.php/yu/r/dyZbZB6M64R.svg'
  return (
    <div>
        <div className="flex flex-col items-center">
            <img src={fbLogo}  
              className="w-40 md:w-44"
            /> 
        </div> 

        <div className="max-w-sm md:max-w-lg mx-auto  py-7 mt-3 border">
        <form className="flex flex-col items-center gap-y-4" onSubmit={LoginUser}> 
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
       Login
     </button>
       </form>
        </div> 


        <div className="max-w-sm mx-auto md:max-w-lg p-2 mt-2 border"> 
        <h1 className="text-center">Don't have an account?   
        <Link to="/signup" className="text-blue-600  underline ml-3">Sign Up</Link>
         </h1>
        </div>

    </div>
  )
}

export default Login