import React,{useState,useEffect} from 'react'
import userStore from '../store/user-store'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@mui/joy';
import { useMediaQuery } from '@mui/material';
import { logoutAct } from '../actions/UserActions';
import { getReport, updateReport } from '../actions/ReportActions';
const EditReport = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [location, setLocation] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:640px)');
  const { id } = useParams();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'time1':
        setTime1(value);
        break;
      case 'time2':
        setTime2(value);
        break;
      default:
        setLocation(value);
    }
  };
  const extractAndSetTimes = (timeString) => {
    let [startTime, endTime] = timeString.split(' to ');
    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };
    startTime = formatTime(startTime);
    endTime = formatTime(endTime);
    setTime1(startTime);
    setTime2(endTime);
  };
  useEffect(() => {
    const getReportData = async () => {
      try {
        const res = await getReport(id); // You missed the await keyword
        if (res.success) {
          setTitle(res.data.title);
          setDate(res.data.date);
          extractAndSetTimes(res.data.time)
          setLocation(res.data.location);
        } else {
          console.log('Report not found');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReportData();
  }, [id]);
  const { name} = userStore((state) => ({
    name: state.name,
  }));
  const navigate=useNavigate()
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
  const handleSubmit=async()=>{
    try {
      const repData = {
        title,
        date,
        time: `${time1} to ${time2}`,
        location,
      };
      updateReport(id,repData).then((res)=>{
        navigate('/reports')
      })
    } catch (error) {
      console.log(error);
    }
  }
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
      <div className="w-full sm:w-1/2 h-full flex flex-col sm:items-center">
      <label className='mx-4 my-4 sm:mx-8 text-lg text-blue-100 sm:text-2xl w-4/5 sm:w-1/2 underline'>Title</label>
      <div className='mx-4 sm:mx-8 w-auto sm:w-1/2'>
        <Input color="primary" size={isSmallScreen ? 'sm' : 'lg'} variant="outlined" value={title} name="title" onChange={handleInputChange} sx={{ backgroundColor: 'transparent', color: 'white', width: '100%', textSizeAdjust: '2rem' }} required />
      </div>
      <label className='mx-4 my-4 sm:mx-8 text-lg text-blue-100 sm:text-2xl w-4/5 sm:w-1/2 underline'>Date</label>
      <div className="relative mx-4 sm:mx-8 w-auto sm:w-1/2">
        <input type="date" id="default-datepicker" className="bg-transparent border h-4/5 sm:h-full border-[#97C3F0] text-blue-100 text-sm rounded-lg datepickerbg block w-full p-2.5 ease-in duration-300" name="date" value={date} onChange={handleInputChange} required />
      </div>
      <label className='mx-4 my-4 sm:mx-8 text-lg text-blue-100 sm:text-2xl w-4/5 sm:w-1/2 underline'>Time</label>
      <div className="relative mx-4 sm:mx-0 w-auto sm:w-1/2 flex justify-between">
        <label className='text-sm text-blue-100 sm:text-lg'>From</label>
        <input type="time" id="time" className="bg-transparent border h-4/5 sm:h-full border-[#97C3F0] text-blue-100 text-sm rounded-lg datepickerbg block w-1/4 p-2.5 ease-in duration-300" name="time1" value={time1} onChange={handleInputChange} required />
        <label className='text-sm text-blue-100 sm:text-lg'>To</label>
        <input type="time" id="time" className="bg-transparent border h-4/5 sm:h-full border-[#97C3F0] text-blue-100 text-sm rounded-lg datepickerbg block w-1/4 p-2.5 ease-in duration-300" name="time2" value={time2} onChange={handleInputChange} required />
      </div>
      <label className='mx-4 my-4 sm:mx-8 text-lg text-blue-100 sm:text-2xl w-4/5 sm:w-1/2 underline'>Location</label>
      <div className='mx-4 sm:mx-8 w-auto sm:w-1/2'>
        <Input color="primary" size={isSmallScreen ? 'sm' : 'lg'} variant="outlined" value={location} name="location" onChange={handleInputChange} sx={{ backgroundColor: 'transparent', color: 'white', width: '100%', textSizeAdjust: '2rem' }} required />
      </div>
      <button type="button" onClick={handleSubmit}  className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
        <span className="relative text-lg">Submit</span>
      </button>
    </div>

    </div>
  )
}

export default EditReport