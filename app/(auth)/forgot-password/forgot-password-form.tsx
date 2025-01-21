"use client"

import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import {auth} from '@/firebase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
export default function ForgotPasswordForm(){
  const [ email,setEmail]=useState('')
  return(
    <form className='flex flex-col gap-4' onSubmit={async (e)=>{
      e.preventDefault()
      await sendPasswordResetEmail(auth,email)
    }}>
      <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Button className="w-full" type="submit">Reset password</Button>
    </form>
  )
}