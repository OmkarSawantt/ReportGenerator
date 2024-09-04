import React, { useEffect, useState } from 'react';
import userStore from '../store/user-store';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { logoutAct } from '../actions/UserActions';

const NewReport = () => {
  const {  name } = userStore((state) => ({
    name: state.name,
  }));
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/new-report') {
      setShouldRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/');
    }
  }, [shouldRedirect, navigate]);

  const logoutHandler = async () => {
    try {
      await logoutAct();
      const { logout } = userStore.getState();
      logout();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full h-full flex items-center flex-col'>
      <div className='w-full'>
        <nav className='flex flex-row items-center px-1 sm:px-10 py-5 justify-between'>
          <Link to='/' className="text-4xl text-blue-100 mx-2 sm:mx-10     relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">{name}</Link>
          <div className='flex w-full sm:w-1/3 justify-evenly items-center'>
            <Link to='/reports' className="text-lg sm:text-xl text-blue-100 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">
              Reports
            </Link>
            <button type="button" onClick={logoutHandler} className="relative h-1/3 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span>
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative text-lg">LogOut</span>
            </button>
          </div>
        </nav>
      </div>
      <hr className="h-px w-full mb-4 shadow shadow-blue-100 bg-gray-200 border-0"></hr>
      <div className='w-full h-full flex items-center flex-col'>
        <h1 className='text-blue-100 text-2xl sm:text-3xl'>Create New Report</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default NewReport;
