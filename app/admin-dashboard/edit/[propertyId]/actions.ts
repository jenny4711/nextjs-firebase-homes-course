"use server"

import { Property } from '@/types/property'
import {auth } from '@/firebase/server'
import { propertyDataSchema } from '@/app/validation/propertySchema';
import { firestore } from '@/firebase/server';
import { revalidatePath } from 'next/cache';

export const updateProperty=async(data:Property,authToken:string)=>{
  const {id,...propertyData}=data;
const verifiedToken=await auth.verifyIdToken(authToken);
if(!verifiedToken.admin){
  return{
    error:true,
    message:"Unauthorized"
  }
}

const validation = propertyDataSchema.safeParse(propertyData);
if(!validation.success){
  return{
    error:true,
    message:validation.error.issues[0]?.message ?? "Validation error"
  }
}

await firestore.collection("properties").doc(id).update({
  ...propertyData,
  updated:new Date(),

})
revalidatePath(`/property/${id}`)
}