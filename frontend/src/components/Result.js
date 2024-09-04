import React from 'react'
import { useLocation } from 'react-router-dom';
import {downloadReport, viewReport} from '../actions/ReportActions'
import Report_img from '../constants/report_png.png'
const Result = () => {
  const loc = useLocation();
  const id = loc.state?.id;
  const handleView=()=>{
    viewReport(id).then((res)=>{
      const url = URL.createObjectURL(res);
      window.open(url);
    }).catch((err)=>{
      console.log(err);
    })
  }
  const handleDownload=()=>{
    downloadReport(id).then((res)=>{
      const url = URL.createObjectURL(res);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${id}.pdf`); // Adjust the filename and extension as needed
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='w-full sm:w-1/2 h-full flex flex-col my-20 sm:items-center '>
      <img src={Report_img} alt="Report_Png" className='w-1/2 sm:w-1/4 self-center'/>
      <div className='self-center w-full lg:w-1/2 flex justify-around '>
        <button type="button" onClick={handleView} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
          <span className="relative text-lg">View</span>
        </button>
        <button type="button" onClick={handleDownload} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
          <span className="relative text-lg">Download</span>
        </button>
      </div>
    </div>
  )
}

export default Result