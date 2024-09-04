import React, { useState } from 'react'
import {Input} from '@mui/joy';
import {useMediaQuery} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import {registerUser} from '../actions/UserActions'
const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:640px)');
  const navigate=useNavigate()
  const handleInputChange = (event) => {
    if(event.target.name==="name"){
      setName(event.target.value);
    }else if(event.target.name==="email"){
      setEmail(event.target.value)
    }else{
      setPassword(event.target.value)
    }
  };
  const signin=async(e)=>{
    e.preventDefault();
    try {
      const body={
        name:name,
        email:email,
        password:password
      }
      registerUser(body).then((res) => {
        alert("User is Created")
        navigate('/login')
      }).catch((err) => {
        alert("Something went wrong")
      });

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className='w-4/5 max-w-lg h-2/3  px-4 py-4 backdrop-blur-3xl rounded-3xl  shadow-inner shadow-blue-100 flex justify-evenly flex-col '>
    <h1 className='text-center text-cyan-100 text-xl sm:text-4xl  '>Sign up</h1>
    <div>
    <label className='mx-4 my-6 sm:mx-8 text-lg text-blue-100 sm:text-2xl'>Name</label>
      <div className='mx-4  sm:mx-8 '>
        <Input color="primary" size={isSmallScreen ? 'sm' : 'lg'} variant="outlined"  value={name} name="name" onChange={handleInputChange}sx={{backgroundColor: 'transparent',color: 'white', width:'100%', textSizeAdjust:'2rem' }}/>
      </div>
      <label className='mx-4 my-6 sm:mx-8 text-lg text-blue-100 sm:text-2xl'>Email</label>
      <div className='mx-4  sm:mx-8 '>
        <Input color="primary" type='email' size={isSmallScreen ? 'sm' : 'lg'} variant="outlined"  value={email} name="email" onChange={handleInputChange}sx={{backgroundColor: 'transparent',color: 'white', width:'100%', textSizeAdjust:'2rem' }}/>
      </div>
      <label className='mx-4 my-6 sm:mx-8 text-lg text-blue-100 sm:text-2xl'>Passward</label>
      <div className='mx-4  sm:mx-8 '>
        <Input color="primary" type="password" size={isSmallScreen ? 'sm' : 'lg'} variant="outlined"  value={password} name="password" onChange={handleInputChange}sx={{backgroundColor: 'transparent',color: 'white', width:'100%', textSizeAdjust:'2rem' }}/>
      </div>
    </div>
    <button type="button" onClick={signin} className="relative w-1/2 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group mx-4 my-4 sm:mx-8 self-center">
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-lg sm:text-2xl">SignUp</span>
    </button>
    <p className='text-base sm:text-xl mx-4 sm:mx-8 text-blue-100'>Already have an account?<Link to='/login'  className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-100 after:transition-transform after:scale-x-0 after:origin-left after:hover:scale-x-100 after:duration-300">Login</Link></p>
    </section>
  )
}

export default Signin