// import { getSession } from 'next-auth/client';
// import { useState, useEffect } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import router from 'next/router';
import { useContext } from 'react';
import NotificationContext from '../../store/notificationContext';

function UserProfile() {
  const notificationctx = useContext(NotificationContext)

  // Redirect away if NOT auth

  // const [isLoading, setIsloading] = useState(true)

  // useEffect (() => {
  //   getSession().then(session => {
  //     if (!session){
  //       router.push('/auth')
  //     } else {
  //     setIsloading(false)}
  //   })
  // }, [])



  // if (isLoading){
  //   return <p>Loading...</p>
  // }

  async function changePasswordHandler (passwordData) {
   const response = await fetch('api/user/changePasword', {
      method: 'PATCH',
      body:JSON.stringify(passwordData),
      headers : {
        'Content-type' : 'application/json'
      }
    })
    
    const data = await response.json()
    console.log(data)

    if(!response.ok){
      notificationctx.showNotification({
      title:'Error',
      message: 'Invalid input, check old password',
      status: 'error'})
    }
     else{
       notificationctx.showNotification({
         title:'Success',
         message: 'Password changed succesfully',
         status: 'success'})
    }
}

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm  onChangePassword ={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
