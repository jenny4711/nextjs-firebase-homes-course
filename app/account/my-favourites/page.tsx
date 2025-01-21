
import PropertyStatusBadge from '@/components/property-status-badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@/components/ui/table';
import { getUserFavourites } from '@/data/favourites'
import { getPropertiesById } from '@/data/properties';
import { EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import RemoveFavouriteButton from './remove-favourite-button';
import { redirect } from 'next/navigation';

export default async function MyFavourites({searchParams}:{searchParams:Promise<any>}){
  const searchParamsValues = await searchParams;
  const page =searchParamsValues?.page?parseInt(searchParamsValues?.page):1;
  const pageSize=2;
  const favourites = await getUserFavourites();
  const allFavourites = Object.keys(favourites)
  const totalPages = Math.ceil(allFavourites.length/pageSize);
  const paginatedFavourites = allFavourites.slice((page-1)*pageSize,page*pageSize);
  const properties = await getPropertiesById(paginatedFavourites)
if(!paginatedFavourites.length && page >1){
  redirect(`/account/my-favourites?page=${totalPages}`)
}
  return (
   <>
   {
    <div className="max-w-screen-lg mx-auto">
    <h1 className="text-4xl font-bold py-4 mt-5">My favourites</h1>
    
 {!paginatedFavourites.length &&(
   <h2 className="text-center text-zinc-400 text-3xl font-bold py-10">You have no favourited property</h2>
 )
   }
   
   
  {!!paginatedFavourites.length && <Table className="mt-4">
    <TableHead>
      <TableRow>
        <TableHead>Property</TableHead>
        <TableHead>Status</TableHead>
       <TableHead/>
      </TableRow>
    </TableHead>
    <TableBody>
      {paginatedFavourites.map((fav)=>{
        const property = properties.find(property=>property.id === fav)
        const address =[property?.address1,property?.address2,property?.postcode].filter(addressLine=>!!addressLine).join(", ")
        return (
          <TableRow key={fav}>
          <TableCell>{address}</TableCell>
          <TableCell>
          {
          !!property &&
          <PropertyStatusBadge status={property?.status}/>
          }
          </TableCell>
          <TableCell className='flex justify-end gap-1'>
            {!!property &&
              
              <>
              
              <Button asChild variant="outline">
              <Link href={`/property/${fav}`}>
              <EyeIcon/>
              </Link>
            </Button>


<RemoveFavouriteButton propertyId={property.id}/>

            
            
            </>
            }



          </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3} className="text-center">
       {Array.from({length:totalPages}).map((_,i)=>{
        return(
          <Button key={i} variant={'outline'} asChild={page !== i+1} disabled={page === i+1}>
            <Link href={`/account/my-favourites?page=${i+1}`}>{i+1}</Link>
          </Button>
       
        )
       })}
        </TableCell>
      </TableRow>
    </TableFooter>
    </Table>}
   </div>
   }
   </>
  )
}