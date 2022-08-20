import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Heading, MainContainer, Btn, ShadowBox } from '../../components'
import { logout, selectUser } from '../../features/userSlice';

export const Dashboard = () => {
    const user = useSelector(selectUser); 

    const dispatch = useDispatch();
    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logout())
    }

  return (
    <div className="h-screen flex flex-col justify-center">
    <MainContainer>
    <ShadowBox>
    <Heading>Dashboard</Heading>
    <p className='mt-5 font-light'>Welcome <span className='font-bold'>{user.username}</span> !</p>
    <Btn onClick={(e) => handleLogout(e)}>Log Out</Btn>
    </ShadowBox>
    </MainContainer>
    </div>
  )
}
