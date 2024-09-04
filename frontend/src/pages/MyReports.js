import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserReports, viewReport, downloadReport,deleteReport } from '../actions/ReportActions';
import userStore from '../store/user-store';
import { logoutAct } from '../actions/UserActions';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const { name } = userStore((state) => ({ name: state.name }));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getUserReports();
        if (response.success) {
          setReports(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchReports();
  }, []);

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

  const handleView = async (reportId) => {
    try {
      const blob = await viewReport(reportId);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async (reportId) => {
    try {
      const blob = await downloadReport(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportId}.pdf`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (reportId) => {
    navigate(`/edit-report/${reportId}`);
  };

  const handleDelete = (reportId) => {
    deleteReport(reportId).then((res)=>{
      if(res.success){
        alert(res.message)
        window.location.reload();
      }else{
        alert("Something went wrong")
      }
    })
  };
  return (
    <div className='w-full h-full flex items-center flex-col'>
      <div className='w-full'>
        <nav className='flex flex-row items-center px-1 sm:px-10 py-5 justify-between'>
          <Link to='/' className="text-4xl text-blue-100 mx-2 sm:mx-10 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">{name}</Link>
          <div className='flex w-full sm:w-1/3 justify-evenly items-center'>
            <Link to='/reports' className="text-lg sm:text-xl text-blue-100 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">Reports</Link>
            <button type="button" onClick={logoutHandler} className="relative h-1/3 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative text-lg">LogOut</span>
            </button>
          </div>
        </nav>
      </div>
      <hr className="h-px w-full mb-4 shadow shadow-blue-100 bg-gray-200 border-0"></hr>
      <div className='w-full px-4'>
        {reports.length > 0 ? (
          <ul className='space-y-4'>
            {reports.map((report) => (
              <li key={report._id} className='backdrop-blur-3xl h-auto text-center xl:text-left xl:h-20 border border-blue-100 shadow-md rounded p-4 flex items-center  flex-col xl:flex-row '>
                <h3 className='text-xl font-bold text-blue-100 sm:w-2/3' ><span className='text-2xl text-blue-300'>Title:</span>{report.title}</h3>
                <div className='flex space-x-4 mt-2 w-full xl:w-1/3  items-center justify-around '>
                  <button onClick={() => handleView(report._id)} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center"><span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-base xl:text-lg">View</span></button>
                  <button onClick={() => handleDownload(report._id)} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center"><span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-green-600 via-green-700 to-green-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-base xl:text-lg">Download</span></button>
                  <button onClick={() => handleEdit(report._id)} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center"><span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-base xl:text-lg">Edit</span></button>
                  <button onClick={() => handleDelete(report._id)} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center"><span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-red-600 via-red-700 to-red-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-base xl:text-lg">Delete</span></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default MyReports;
