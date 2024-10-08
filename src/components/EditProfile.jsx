import React, { useState, useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../features/getProfile';
import axios from 'axios';

function EditProfile() {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const HandleEditProfile = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("bio", bio);

      const response = await axios.post('https://facebook-kt2g.onrender.com/user/editprofile', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        window.location.reload();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4">
          {profile?.profile?.image || previewUrl ? (
            <img
              src={previewUrl || profile?.profile?.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <FaRegUser size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {open ? 'Cancel' : 'Change Profile Picture'}
        </button>
      </div>

      <form className="space-y-4" onSubmit={HandleEditProfile}>
        {open && (
          <div className="flex items-center justify-center w-full">
            <label htmlFor="profile-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            id="bio"
            rows="3"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;