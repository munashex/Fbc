
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { FaRegUser, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowingLoading] = useState(false);  
  const [loadingFollowers, setLoadingFollowers] =  useState(false) 
  const [loadingFollowing, setLoadingFollowing] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  
  const [open, setOpen] = useState(false) 
  const [openFollowing, setOpenFollowing] = useState(false)
  const [singleUser, setSingleUser] = useState({});
  const currentUserId = localStorage.getItem('userId');  
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const onOpenModal = () => setOpen(true) 
  const onCloseModal = () => setOpen(false)  

  const onOpenFollowing = () => setOpenFollowing(true) 
  const onCloseFollowing = () => setOpenFollowing(false)

  if (!token) {
    navigate('/signin');
  }

  const getUser = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://facebook-kt2g.onrender.com/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  const getSingleUser = async () => {
    try {
      const response = await axios.get(`https://facebook-kt2g.onrender.com/user/singleUser/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSingleUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const followUser = async (_id) => {
    try {
      setFollowingLoading(true);
      const response = await axios.post(
        `https://facebook-kt2g.onrender.com/user/follow/${_id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload()
      setFollowingLoading(false);
    } catch (err) {
      setFollowingLoading(false);
      console.log(err);
    }
  };

  const UnfollowUser = async (_id) => {
    try {
      setFollowingLoading(true);
      const response = await axios.post(
        `https://facebook-kt2g.onrender.com/user/unfollow/${_id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload()
      setFollowingLoading(false);
    } catch (err) {
      setFollowingLoading(false);
      console.log(err);
    }
  };

  const getFollowers = async() => {
  try {
    setLoadingFollowers(true) 
  const response = await axios.get(`https://facebook-kt2g.onrender.com/user/followers/${id}`) 
   setFollowers(response.data.followers) 
   setLoadingFollowers(false)
  }catch(err) {
   console.log(err) 
   setLoadingFollowers(false)
  }
  }

  
  
 

  useEffect(() => {
  getFollowers()
  }, [])

  

 const getFollowing = async() => {
  try {
  setFollowingLoading(true)
  const response = await axios.get(`https://facebook-kt2g.onrender.com/user/following/${id}`) 
  setFollowing(response.data.following) 
  setFollowingLoading(false)
  }catch(err) {
  console.log(err) 
  setFollowingLoading(false)
  }
 } 

 useEffect(() => {
 getFollowing()
 }, [])



 return (
  <div className="max-w-4xl mx-auto p-4">
    <div className="bg-white shadow rounded-lg mb-8">
      <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="absolute -bottom-16 left-4 flex items-end">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
            {user?.user?.image ? (
              <img src={user?.user?.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <FaRegUser className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 px-4 pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold uppercase">{user?.user?.name}</h1>
          {singleUser?.followers?.includes(currentUserId) ? (
            <button
              onClick={() => UnfollowUser(singleUser._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              {followLoading ? 'Loading...' : 'Unfollow'}
            </button>
          ) : (
            <button
              onClick={() => followUser(singleUser._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              {followLoading ? 'Loading...' : 'Follow'}
            </button>
          )}
        </div>
        <div className="flex mt-4 space-x-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            onClick={onOpenModal}
          >
            <FaUserFriends className="mr-2 h-4 w-4" />
            {singleUser?.followers?.length} Followers
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            onClick={onOpenFollowing}
          >
            <FaUserPlus className="mr-2 h-4 w-4" />
            {singleUser?.following?.length} Following
          </button>
        </div>
      </div>
    </div>

    {loading ? (
      <div className="space-y-7">
        {[1, 2, 3].map((item) => (
          <div
            className="bg-white shadow rounded-lg p-4 w-full h-80 animate-pulse"
            key={item}
          ></div>
        ))}
      </div>
    ) : (
      <div className="space-y-8">
        {user?.post &&
          user?.post?.map((item) => (
            <div className="bg-white shadow rounded-lg" key={item._id}>
              <div className="flex items-center gap-x-2 p-4">
                {item?.image ? (
                  <img src={item?.image} alt={item?.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <span className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaRegUser size={24} className="text-gray-400" />
                  </span>
                )}
                <h1 className="font-bold">{item?.name}</h1>
              </div>

              <p className="px-4 py-2">{item?.caption}</p>

              {item?.image && (
                <img src={item?.image} alt="Post" className="w-full object-cover max-h-96" />
              )}

              <div className="flex justify-around font-bold p-4 border-t">
                <h1>
                  {item?.likes?.length} {item?.likes?.length === 1 ? 'like' : 'likes'}
                </h1>
                <Link
                  to={`/post/${item._id}`}
                  className={`${
                    item?.comments?.length === 0 ? 'invisible' : 'text-blue-600 hover:underline'
                  }`}
                >
                  {item?.comments?.length} {item?.comments?.length === 1 ? 'comment' : 'comments'}
                </Link>
              </div>
            </div>
          ))}
      </div>
    )}

    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{
        modal: 'w-[90%] md:w-1/2 lg:w-1/2 p-6 rounded-lg',
        closeIcon: 'top-2 right-2',
      }}
      center
    >
      <h1 className="text-2xl font-bold mb-4">Followers</h1>

      {loadingFollowers ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="space-y-4">
          {followers &&
            followers.map((item) => (
              <Link
                to={`${item.user === currentUserId ? '/profile' : `/user/${item.user}`}`}
                key={item._id}
                className="flex items-center gap-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                <h1 className="font-bold text-lg">{item.name}</h1>
              </Link>
            ))}
        </div>
      )}
    </Modal>

    <Modal
      open={openFollowing}
      onClose={onCloseFollowing}
      classNames={{
        modal: 'w-[90%] md:w-1/2 lg:w-1/2 p-6 rounded-lg',
        closeIcon: 'top-2 right-2',
      }}
      center
    >
      <h1 className="text-2xl font-bold mb-4">Following</h1>

      {loadingFollowing ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="space-y-4">
          {following &&
            following.map((item) => (
              <Link
                to={`${item.user === currentUserId ? '/profile' : `/user/${item.user}`}`}
                key={item._id}
                className="flex items-center gap-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                <h1 className="font-bold text-lg">{item.name}</h1>
              </Link>
            ))}
        </div>
      )}
    </Modal>
  </div>
); 
}

export default UserProfile;
