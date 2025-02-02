import Image from "next/image";
import { Carousel ,CarouselContent,CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import { getPropertyById } from '@/data/properties';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function Home() {
  const property = await getPropertyById('a19tVPQB2kh7rd4Enb83')
  console.log(property,'property')
  return (

    <div className="min-h-screen w-full bg-[url('/home.jpg')] bg-cover bg-center bg-fixed  ">
        
      <main className="relative flex flex-col gap-8 items-center sm:items-start min-h-screen">
      <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-black/30 to-black/70 flex-col">

     <div className="w-[500px] flex item-center justify-center mt-24">
  <h1 className="text-6xl font-bold text-white w-[400px] leading-[1.4]">Find the Property of Your Dreams </h1>
  </div>

        <div className="w-[500px] flex item-center justify-center mt-8 ">
          <p className ="text-white w-[400px] pt-10  drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]0">
Over 100 construction and real astate projects can be found here.
The building owner selected us over other properties due to the unique nature of our work
          </p>
         
        </div>

        <div className='w-[500px] flex item-center justify-center mt-8'>
        <Button asChild className='w-[150px] bg-green-800 '>
          <Link href="/property-search">Find Property</Link>
        </Button>
        </div>
        </div>

       
      </main>
     
    </div>
  );
}





