"use client"
import { propertySchema } from '@/app/validation/propertySchema';
import PropertyForm from '@/components/property-form';
import { Property } from '@/types/property';
import { SaveIcon } from 'lucide-react';
import { z } from "zod";
import { auth, storage } from '@/firebase/client';
import { updateProperty } from './actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { deleteObject, UploadTask,ref ,uploadBytesResumable} from 'firebase/storage';
import { savePropertyImages } from '../../action';

type Props = Property;

export default function EditPropertyForm({
  id,
  address1,
  address2,
  city,
  postcode,
  bathrooms,
  bedrooms,
  description,
  price,
  status,
  images =[]
}: Props) {
  console.log(images,'images')
  const router = useRouter()
  const {toast}=useToast()
  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images: newImages, ...rest } = data;

    const response = await updateProperty({ ...rest, id }, token);

    if (!!response?.error) {
      toast({
        title: "Error!",
        description: response.message,
        variant: "destructive",
      });
      return;
    }

  const storageTasks:(UploadTask | Promise<void>)[]=[];
  const imagesToDelete = images?.filter(
    (image) => !newImages.find((newImage:any) => image === newImage.url)
  );

imagesToDelete?.forEach(image=>{
  storageTasks.push(deleteObject(ref(storage,image)));
})

const paths:string[]=[]
newImages.forEach((image,index)=>{
  if(image.file){
     const path = `properties/${
             id
            }/${Date.now()}-${index}-${image.file.name}`;
            paths.push(path);
            const storageRef = ref(storage, path);
            storageTasks.push(uploadBytesResumable(storageRef, image.file));
  }else{
    paths.push(image.url)
  }

 
})
await Promise.all(storageTasks);
await savePropertyImages({propertyId:id,images:paths},token)
    toast({
      title:"Success!",
      description:"Property updated",
      variant:"success",
    })
    router.push('/admin-dashboard')
  };
  return (
    <div>
       <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
          <SaveIcon/>Save Property
          </>
             
        }
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          bathrooms,
          bedrooms,
          description,
          price,
          status,
          images:images?.map((image)=>({
            id:image,
            url:image,
          }))
        }}
      />
    </div>
  );
}
