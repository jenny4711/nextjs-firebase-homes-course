"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
export default function BackBtn(){
  const router = useRouter()
  return(
    <Button variant="link" onClick={()=>router.back()}>
    <ArrowLeftIcon/>Back
  </Button>
  )
}