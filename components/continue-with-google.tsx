"use client"


import { Button } from './ui/button'
import { signInWithPopup ,GoogleAuthProvider} from 'firebase/auth';
import {auth} from "@/firebase/client"
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';

export default function ContinueWithGoogleButton(){
  const auth = useAuth()
  const router = useRouter()
  return(
    <Button variant="outline" onClick={async()=>{
      try{
        await auth?.loginWithGoogle();
        router.refresh()
      }catch(error){
        console.log(error,'error')
      }
  
    }}
   className='w-full'
    >
      Continue with Google
    </Button>
  )
}