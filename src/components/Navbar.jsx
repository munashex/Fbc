import { useEffect, useState } from 'react';
import { BsFacebook, BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { PiDotsNineBold } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../features/getProfile';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { BiLogOut } from 'react-icons/bi';
import facebookLogo from '../images/facebook.svg';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenSearch = () => setOpenSearch(true);
  const onCloseSearch = () => setOpenSearch(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const SearchUser = () => {
    onCloseSearch();
    navigate(`/search/${search}`);
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar for small screens */}
      <div className="flex md:hidden items-center justify-between p-2">
        <Link to="/">
          <img src={facebookLogo} alt="Facebook" className="w-40" />
        </Link>

        <div className="flex items-center gap-x-5 px-2">
          <button onClick={onOpenSearch} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <BsSearch size={20} />
          </button>
          <button onClick={onOpenModal} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <FaBars size={20} />
          </button>
        </div>
      </div>

      {/* Navbar for medium and large screens */}
      <div className="hidden md:flex justify-between px-6 py-2 items-center">
        <div className="flex items-center gap-x-5">
          <Link to="/">
            <BsFacebook size={50} color="blue" />
          </Link>
          <button onClick={onOpenSearch} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <BsSearch size={25} />
          </button>
        </div>

        <div className="flex items-center gap-x-5">
          <button onClick={onOpenModal} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <PiDotsNineBold size={25} />
          </button>

          {profile?.profile?.image ? (
            <Link to="/profile">
              <img src={profile.profile.image} className="w-11 h-11 rounded-full object-cover" alt="Profile" />
            </Link>
          ) : (
            <Link to="/profile" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <FaRegUserCircle size={25} />
            </Link>
          )}
        </div>

        {/* Logout Modal */}
        <Modal 
          open={open} 
          onClose={onCloseModal} 
          classNames={{ modal: 'w-[80%] lg:w-1/4 p-6 rounded-lg', closeIcon: 'mt-2' }}>
          <div className="text-center">
            <h1 className="font-semibold text-lg mb-4">Are you sure you want to log out?</h1>
            <div className="flex justify-center gap-4">
              <button 
                onClick={onCloseModal} 
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={Logout} 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                Log Out
              </button>
            </div>
          </div>
        </Modal>

        {/* Search Modal */}
        <Modal 
          open={openSearch} 
          onClose={onCloseSearch} 
          classNames={{ modal: 'w-[90%] md:w-[40%] p-6 rounded-lg', closeIcon: 'mt-4' }}>
          <div className="flex flex-col items-center space-y-4">
            <input
              className="w-[90%] p-3 rounded-full bg-gray-100 border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
              placeholder="Search Facebook"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              onClick={SearchUser} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-lg">
              Search
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
