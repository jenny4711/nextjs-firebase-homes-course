"use client"

import { z } from 'zod'
import { passwordValidation } from '../validation/registerUserSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth'
import { EmailAuthCredential, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { useToast } from '@/hooks/use-toast'
import { error } from 'console'

const formSchema=z.object({
  currentPassword:passwordValidation,
  newPassword:passwordValidation,
  newPasswordConfirm:z.string()
}).superRefine((data,ctx)=>{
  if(data.newPassword !== data.newPasswordConfirm){
    ctx.addIssue({
      message:"Passwords do not match",
      path:["newPasswordConfirm"],
      code:"custom",
    })
  }
})

export default function UpdatePasswordForm(){
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      currentPassword:"",
      newPassword:"",
      newPasswordConfirm:""
    }
  })
  const {toast}=useToast()
const auth =useAuth()
const handleSubmit = async(data:z.infer<typeof formSchema>)=>{
  const user =   auth?.currentUser;
  if(!user?.email){
    return;
  }
  try{
    await reauthenticateWithCredential(user,EmailAuthProvider.credential(user?.email,data.currentPassword))
    await updatePassword(user,data.newPassword)
    toast({
      title:"Password Updated",
      variant:"success"
    })
form.reset()
  }catch(error:any){
    console.log(error,'error')
    toast({
      title:error.code === "auth/invalid-credential"?"Incorrect password":"Error-Update Password",
      description:"An error occurred",
      variant:"destructive"
    })
  }

}

  return(
    <div className='pt-5 mt-5 border-t'>
      <h2 className="text-2xl font-bold pb-2">Update Password</h2>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <fieldset className="flex flex-col gap-4" disabled={form.formState.isSubmitted}>
      <FormField control={form.control} name="currentPassword" render={({field})=>(
        <FormItem>
          <FormLabel>current Password</FormLabel>
          <FormControl>
            <Input {...field} type="password" placeholder='Current Password'/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}/>

<FormField control={form.control} name="newPassword" render={({field})=>(
        <FormItem>
          <FormLabel>New Password</FormLabel>
          <FormControl>
            <Input {...field} type="password" placeholder='New Password'/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}/>

<FormField control={form.control} name="newPasswordConfirm" render={({field})=>(
        <FormItem>
          <FormLabel>New Password Confirm</FormLabel>
          <FormControl>
            <Input {...field} type="password" placeholder='New Password Confirm'/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}/>
      <Button type="submit">Update Password</Button>
      </fieldset>
    </form>
   </Form>
   </div>
  )
}