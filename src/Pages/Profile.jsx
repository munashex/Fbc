import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUser, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { HiPencil, HiOutlinePhotograph } from 'react-icons/hi';
import { getUser } from '../features/getUser';
import { getProfile } from '../features/getProfile';
import UploadProfile from '../components/UploadProfile';
import EditProfile from '../components/EditProfile';
import Post from '../components/Post';
import UserPost from '../components/UserPost';
import axios from 'axios';

export default function Profile() {
  const [openUpload, setOpenUpload] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const [loadingFollowers, setLoadingFollowers] = useState(false);

  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getUser());
    dispatch(getProfile());
    if (!token) {
      navigate('/signin');
    }
  }, [dispatch, token, navigate]);

  const getFollowing = async (_id) => {
    try {
      setLoadingFollowing(true);
      const response = await axios.get(`https://facebook-kt2g.onrender.com/user/following/${_id}`);
      setFollowing(response.data.following);
      setLoadingFollowing(false);
    } catch (err) {
      console.error(err);
      setLoadingFollowing(false);
    }
  };

  const getFollowers = async (_id) => {
    try {
      setLoadingFollowers(true);
      const response = await axios.get(`https://facebook-kt2g.onrender.com/user/followers/${_id}`);
      setFollowers(response.data.followers);
      setLoadingFollowers(false);
    } catch (err) {
      console.error(err);
      setLoadingFollowers(false);
    }
  };

  useEffect(() => {
    getFollowing(userId);
    getFollowers(userId);
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-blue-400 to-purple-500">
          <div className="absolute -bottom-16 left-4 flex items-end">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              {profile?.profile?.image ? (
                <img src={profile.profile.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <FaRegUser className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <button
              className="ml-2 mb-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={() => setOpenUpload(true)}
            >
              <HiOutlinePhotograph className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="mt-20 px-4 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
              onClick={() => setOpenEdit(true)}
            >
              <HiPencil className="mr-2 h-4 w-4" /> Edit Profile
            </button>
          </div>
          <div className="flex mt-4 space-x-4">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center"
              onClick={() => setOpenFollowers(true)}
            >
              <FaUserFriends className="mr-2 h-4 w-4" />
              {followers.length} Followers
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center"
              onClick={() => setOpenFollowing(true)}
            >
              <FaUserPlus className="mr-2 h-4 w-4" />
              {following.length} Following
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === 'posts'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'about'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
      </div>

      {activeTab === 'posts' && (
        <div>
          <Post />
          <UserPost />
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About {user?.name}</h2>
          <p className="text-gray-600">User bio and additional information can be displayed here.</p>
        </div>
      )}

      {openUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Choose profile picture</h2>
            <UploadProfile />
            <button
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              onClick={() => setOpenUpload(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <EditProfile />
            <button
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              onClick={() => setOpenEdit(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {openFollowers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Followers</h2>
            {loadingFollowers ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {followers.map((item) => (
                  <Link to={`/user/${item.user}`} key={item._id} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              onClick={() => setOpenFollowers(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {openFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Following</h2>
            {loadingFollowing ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {following.map((item) => (
                  <Link to={`/user/${item.user}`} key={item._id} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              onClick={() => setOpenFollowing(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}