import { useEffect, useState } from 'react';
import { getProfile } from '../features/getProfile';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Post() {
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const token = localStorage.getItem('token');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const PostImage = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);

      const response = await axios.post('https://facebook-kt2g.onrender.com/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        window.location.reload();
        navigate('/');
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-[95%] md:max-w-2xl border shadow rounded-md p-3 flex justify-between items-center mx-auto bg-white">
        <Link to="/profile" className="flex-shrink-0">
          {profile?.profile?.image ? (
            <img src={profile?.profile?.image} className="w-12 h-12 rounded-full object-cover" alt="profile" />
          ) : (
            <div className="flex items-center justify-center bg-gray-200 w-12 h-12 rounded-full">
              <FaRegUser size={28} className="text-gray-500" />
            </div>
          )}
        </Link>

        <input
          onClick={onOpenModal}
          className="border border-gray-300 w-[80%] py-2 px-4 rounded-full placeholder:text-lg focus:outline-none focus:border-blue-500 transition"
          placeholder="What's on your mind?"
        />
      </div>

      <Modal open={open} onClose={onCloseModal} classNames={{ modal: 'w-[90%] md:w-1/3 lg:w-1/3', closeIcon: 'mt-1' }} center>
        <div className="p-4">
          <h1 className="text-lg font-bold text-center mb-4">Create Post</h1>

          <div className="flex items-center gap-x-3 mb-4">
            {profile?.profile?.image ? (
              <img src={profile?.profile?.image} className="w-10 h-10 rounded-full object-cover" alt="profile" />
            ) : (
              <div className="flex items-center justify-center bg-gray-200 w-10 h-10 rounded-full">
                <FaRegUser size={24} className="text-gray-500" />
              </div>
            )}
            <h1 className="text-lg font-medium">{user?.name}</h1>
          </div>

          <form onSubmit={PostImage} className="space-y-4">
            <div className="w-full">
              <label className="block mb-1 text-gray-600 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-bold rounded-md transition ${
                loading ? 'bg-blue-500 cursor-not-allowed animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Post;
