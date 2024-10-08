import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import { FaUser } from 'react-icons/fa'

function Search() {
  const { name } = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const userId = localStorage.getItem('userId')

  const getUser = async (username) => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`https://facebook-kt2g.onrender.com/user/search/${username}`)
      setUser(response.data.user)
      setLoading(false)
    } catch (err) {
      console.log(err.response?.data?.message)
      setError('User not found')
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser(name)
  }, [name])

  return (
    <div className="max-w-md mx-auto my-8 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Search Results</h2>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : user.user ? (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <Link
            to={user.user === userId ? '/profile' : `/user/${user.user}`}
            className="mb-4 w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 hover:border-blue-600 transition-colors"
          >
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-400 w-16 h-16" />
              </div>
            )}
          </Link>
          <h1 className="font-bold text-xl text-center">{user.name}</h1>
          <Link
            to={user.user === userId ? '/profile' : `/user/${user.user}`}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            View Profile
          </Link>
        </div>
      ) : (
        <div className="text-center text-gray-500 font-semibold">No results found</div>
      )}
    </div>
  )
}

export default Search