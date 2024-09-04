import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@mui/joy';
import { useMediaQuery } from '@mui/material';
import { createReport } from '../actions/ReportActions';

const TextInput = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [location, setLocation] = useState('');
  const loc = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:640px)');
  const navigate = useNavigate();

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

  const data = loc.state?.data;

  const handleSubmit = () => {
    const repData = {
      title,
      date,
      time: `${time1} to ${time2}`,
      location,
      template: data?.template
    };

    if (data?.template === 1 || data?.template === 2) {
      console.log(repData);
      createReport(repData).then((res) => {
        console.log(res);
        navigate('/new-report/result', { state: { id: res.data._id } });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      navigate('/new-report/image', { state: { repData } });
    }
  };

  return (
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
        <input type="time" id="time" className="bg-transparent  border h-4/5 sm:h-full border-[#97C3F0] text-blue-100 text-sm rounded-lg datepickerbg block w-32 sm:w-1/4 p-2.5 ease-in duration-300" name="time1" value={time1} onChange={handleInputChange} required />
        <label className='text-sm text-blue-100 sm:text-lg'>To</label>
        <input type="time" id="time" className="bg-transparent border h-4/5 sm:h-full border-[#97C3F0] text-blue-100 text-sm rounded-lg datepickerbg block w-32 sm:w-1/4 p-2.5 ease-in duration-300" name="time2" value={time2} onChange={handleInputChange} required />
      </div>
      <label className='mx-4 my-4 sm:mx-8 text-lg text-blue-100 sm:text-2xl w-4/5 sm:w-1/2 underline'>Location</label>
      <div className='mx-4 sm:mx-8 w-auto sm:w-1/2'>
        <Input color="primary" size={isSmallScreen ? 'sm' : 'lg'} variant="outlined" value={location} name="location" onChange={handleInputChange} sx={{ backgroundColor: 'transparent', color: 'white', width: '100%', textSizeAdjust: '2rem' }} required />
      </div>
      <button type="button" onClick={handleSubmit} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
        <span className="relative text-lg">Submit</span>
      </button>
    </div>
  );
};

export default TextInput;
