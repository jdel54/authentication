import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import classes from './starting-page.module.css';
import { useEffect, useState } from 'react';

function StartingPageContent() {
  const router = useRouter()
  
  const[isLoading, setIsLoading] = useState(true)

 useEffect (() => {
     getSession().then(session => {
      if (!session){
      router.push('/auth')
        } 
        else { 
          setIsLoading (false)
        }
     })
   }, [])

   if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
}

export default StartingPageContent;
