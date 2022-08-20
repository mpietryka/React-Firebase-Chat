import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Heading, MainContainer, Btn, ShadowBox, Grid2cols } from '../../components'
import { logout, selectUser } from '../../features/userSlice';
import avatar from "./generic-avatar-1.png";

export const Dashboard = () => {
    const user = useSelector(selectUser); 

    const dispatch = useDispatch();
    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logout())
    }

  return (
    <div className="h-screen flex flex-col justify-center">
    <div className='w-3/4 mx-auto mt-8'>
    <Heading>Welcome Back <span>{user.username}</span> !</Heading>
    <ShadowBox>
    <h1 className='text-xl md:text-2xl text-center mb-8 font-semibold'>User Dashboard</h1>
    <Grid2cols>
      <div>
        <img src={avatar} alt="avatar" className='mx-auto rounded-full object-scale-down'></img>
      </div>
      <div>
      <p className='text-base md:text-1xl lg:text-2xl mt-5 font-semibold text-left '>{user.username}</p>
      </div>
    </Grid2cols>
    <div className='md:w-1/4 mx-auto'>
    <Btn onClick={(e) => handleLogout(e)}>Log Out</Btn>
    </div>
    </ShadowBox>
    </div>
    </div>
  )
}
