import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export const GET = async (request:NextRequest)=>{
  const path = request.nextUrl.searchParams.get("redirect");
  if(!path){
    return NextResponse.redirect(new URL("/",request.url))
  }
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("friebaseAuthRefreshToken")?.value;
  if(!refreshToken ){
    return NextResponse.redirect(new URL("/",request.url))
  }


  try{
    const response = await fetch(`https://scuretoken.googleapis.com/v1/token?key=AIzaSyBJpk4ua92B2Cj-pqPlnmqLq_HVsosB8n0`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        grant_type:"refresh_tokekn",
        refresh_token:refreshToken
      })
    })
    const json = await response.json();
    const newToken = json.id_token
    cookieStore.set('firebaseAuthToken',newToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV ==='production'
    })
    return NextResponse.redirect(new URL(path,request.url))
  }catch(err){
    console.log("Failed to refresh token:",err)
    return NextResponse.redirect(new URL("/",request.url))
  }
}