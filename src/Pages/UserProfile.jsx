import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { FaRegUser } from 'react-icons/fa';
import {Modal} from 'react-responsive-modal' 

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
    <div>
      <div className="bg-gradient-to-r from-gray-300 to-slate-300 border relative max-w-2xl mx-auto h-40 md:h-60 md:max-w-2xl">
        <div>
          <div className="flex md:hidden">
            {user?.user?.image ? (
              <div className="absolute -bottom-9 left-5">
                <img src={user?.user?.image} className="w-32 rounded-full" />
              </div>
            ) : (
              <button className="absolute -bottom-9 border  left-5 bg-gray-200 p-4 rounded-full">
                <FaRegUser size={80} color="gray" />
              </button>
            )}
            {singleUser?.followers?.includes(currentUserId) ? (
              <button 
              onClick={() => UnfollowUser(singleUser._id)}
               className="absolute -bottom-9 right-5 text-lg bg-blue-600 text-white  px-2 rounded-md">
                {followLoading ? 'loading' : 'unfollow'}
              </button>
            ) : (
              <button
                onClick={() => followUser(singleUser._id)}
                className="absolute -bottom-9 right-5 text-lg bg-blue-600 text-white  px-2 rounded-md"
              >
                {followLoading ? 'loading' : 'follow'}
              </button>
            )}
          </div>

          <div className="hidden md:flex">
            {user?.user?.image ? (
              <div className="absolute -bottom-14 left-5">
                <img src={user?.user?.image} className="w-32 rounded-full" />
              </div>
            ) : (
              <button className="absolute -bottom-14 border left-5 bg-gray-200 p-4 rounded-full">
                <FaRegUser size={80} color="gray" />
              </button>
            )}

            {singleUser?.followers?.includes(currentUserId) ? 
            <button 
            onClick={() => UnfollowUser(singleUser._id)}
             className="absolute  font-semibold -bottom-11 left-40 text-lg py-1 px-4 bg-blue-600 text-white rounded-md">
            {followLoading ? 'loading' : 'unfollow'}
          </button> 
          : 
          <button 
          onClick={() => followUser(singleUser._id)}
          className="absolute  font-semibold -bottom-11 left-40 text-lg py-1 px-4 bg-blue-600 text-white rounded-md">
            {followLoading ? 'loading' : 'follow'}
            </button>
            }
            
          </div>
        </div>
      </div>

      

      <div>
        {loading ? (
          <div className="flex justify-center mt-0 md:mt-9">
            <Loader />
          </div>
        ) : (
          <div className="mt-9 flex md:mt-12 flex-col md:items-center">
            <h1 className="text-2xl font-bold ml-6 md:ml-0  md:mr-60 mt-3 uppercase">
              {user?.user?.name}
            </h1>
          </div>
        )}
      </div>

      <div className="max-w-sm mx-auto font-bold text-lg flex justify-center gap-x-8 mt-3"> 
       <button onClick={onOpenModal}>followers {singleUser?.followers?.length}</button> 
       <button onClick={onOpenFollowing}>following {singleUser?.following?.length}</button> 
      </div>

      <div>
        {loading ? (
          <div className="space-y-7">
            {[1, 2, 3].map((item) => (
              <div
                className="max-w-sm bg-gray-200 animate-pulse md:max-w-lg border p-2 mx-auto h-80"
                key={item}
              ></div>
            ))}
          </div>
        ) : (
          <div className="my-9">
            {user?.post &&
              user?.post?.map((item) => (
                <div className="my-14" key={item._id}>
                  <div className="max-w-lg  mx-auto border-b  md:border md:shadow rounded-md">
                    <div className="flex items-center gap-x-2 p-2">
                      {item?.image ? (
                        <img src={item?.image} className="w-11 rounded-full" />
                      ) : (
                        <span className="bg-gray-200 p-2 rounded-full">
                          <FaRegUser size={30} />
                        </span>
                      )}
                      <h1 className="font-bold">{item?.name}</h1>
                    </div>

                    <h1 className="my-2 mx-5">{item?.caption}</h1>

                    <div>
                      <img src={item?.image} className="w-[100%]" />
                    </div>

                    <div className="flex justify-around font-bold my-2">
                      <h1>
                        {item?.likes?.length <= 1 ? 'like' : 'likes'}{' '}
                        {item?.likes?.length}
                      </h1>
                      <Link
                        to={`/post/${item._id}`}
                        className={`${
                          item?.comments?.length === 0 ? 'invisible' : 'underline text-blue-600'
                        }`}
                      >
                        view {item?.comments?.length <= 1 ? 'comment' : 'comments'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>


      <Modal open={open} onClose={onCloseModal} 
      classNames={{modal: 'w-[90%] md:w-1/2  lg:w-1/2 ', closeIcon: 'mt-1'}} center
      >
      <h1 className="text-lg font-bold">Followers</h1> 
      
      {loadingFollowers ? 
      <div className="flex justify-center">
        <Loader/>
      </div>: 
      ( 
      <div className="flex flex-col mt-5 gap-y-5">
        {followers && followers.map((item) => (
          <Link to={`${item.user === currentUserId ? '/profile' : `/user/${item.user}`}`} key={item._id} className="flex items-center gap-x-3">
            <img src={item.image} className="w-16 rounded-full"/> 
            <h1 className="font-bold text-lg">{item.name}</h1>
          </Link>
        ))}
      </div> 
      ) 
      }
      </Modal> 

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
          <Link to={`${item.user === currentUserId ? '/profile' : `/user/${item.user}`}`} key={item._id} className="flex items-center gap-x-3">
            <img src={item.image} className="w-16 rounded-full"/> 
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
