import React, { useEffect,useState } from 'react'
import userStore from '../store/user-store'
import { Link, useNavigate } from 'react-router-dom';
import { logoutAct } from '../actions/UserActions';
const Home = () => {
  const { id, name, initiallizer } = userStore((state) => ({
    id: state.id,
    name: state.name,
    initiallizer: state.initiallizer
  }));
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initialize = async () => {
      await initiallizer();
      setLoading(false);
    };
    initialize();
  }, [initiallizer]);

  useEffect(() => {
    if (!loading && !id) {
      navigate('/login');
    }
  }, [id, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const logoutHandler=async()=>{
    try {
      await logoutAct();
      const { logout } = userStore.getState();
      logout();

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }
  const handelCreate = () => {
    navigate('/new-report/template');
  };
  return (
    <div className='w-full h-full flex items-center flex-col'>
      <div className='w-full'>
        <nav className='flex flex-row items-center px-1 sm:px-10 py-5 justify-between'>
          <Link to='/' className="text-4xl text-blue-100 mx-2 sm:mx-10     relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">{name}</Link>
           <div className='flex w-full sm:w-1/3 justify-evenly items-center'>
            <Link to='/reports' className="text-lg sm:text-xl text-blue-100 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">Reports</Link>
            <button type="button" onClick={logoutHandler}  className="relative h-1/3 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group  self-center">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-lg ">LogOut</span>
            </button>
          </div>
        </nav>
      </div>
      <hr className="h-px w-full mb-4 shadow shadow-blue-100 bg-gray-200 border-0"></hr>
      <div className='h-full w-2/3 sm:w-1/4 flex justify-center items-center'>
        <button onClick={handelCreate} className="h-28 w-full group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
          <span className="text-2xl">Create New Report</span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/20"></div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Home