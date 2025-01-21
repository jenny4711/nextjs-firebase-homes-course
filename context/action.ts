"use server"

import { auth } from '@/firebase/server';
import { cookies } from 'next/headers';
export const removeToken = async ()=>{
  const cookieStore = await cookies();
  cookieStore.delete('firebaseAuthToken')
  cookieStore.delete('firebaseAuthRefreshToken')

}


export const setToken = async({token,refreshToken}:{token:string;refreshToken:string;})=>{
  try{

    const verifiedToken = await auth.verifyIdToken(token);
    if(!verifiedToken){
      return;
    }
    const userRecord=await auth.getUser(verifiedToken.uid)
    
    if(process.env.ADMIN_EMAIL === userRecord.email && !userRecord.customClaims?.admin){
      console.log('setting admin claims')
      auth.setCustomUserClaims(verifiedToken.uid,{admin:true})
    }
    const cookiesStore = await cookies();
    cookiesStore.set('firebaseAuthToken',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV ==='production'
    })
    cookiesStore.set('firebaseAuthRefreshToken',refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV ==='production'
    })
  }catch(error){
    console.log(error)
  }

}