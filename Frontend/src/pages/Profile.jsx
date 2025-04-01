import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateSuccess,setUpdataSuccess]=useState(false);
  // State for form data
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      const data = await res.json();
      dispatch(updateUserSuccess(data));
      // console.log('Profile updated:', data
      // );
      setUpdataSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
      // console.error('Error updating profile:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <img
          src={currentUser?.profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 mt-2 rounded-full object-cover self-center cursor-pointer"
        />
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          value={formData.email}
          disabled // Email should not be editable
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading} 
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      
      {error && <p className="text-red-500 text-center mt-2">{error}</p>} 
      {updateSuccess && <p className="text-green-500 text-center mt-2">Updated Successfully</p>}
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleLogout}>Log Out</span>
      </div>
    </div>
  );
}
