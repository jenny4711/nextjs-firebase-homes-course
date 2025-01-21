"use server"
import { registerUserSchema } from '@/app/validation/registerUserSchema';
import { auth } from '@/firebase/server';

export const registserUser = async(data:{
  email:string;
  password:string;
  passwordConfirm:string;
  name:string;
})=>{
 
  const validation = registerUserSchema.safeParse(data);
  if(!validation.success){
    return{
      error:true,
      message:validation.error.issues[0]?.message ?? "An e rror occurred"
    }
  }
try{
  await auth.createUser({
    displayName:data.name,
    email:data.email,
    password:data.password
  });

}catch(err:any){
  console.log(err,'error')
  return{
    error:true,
    message:err.message??"Could not register user",
  }
}





}