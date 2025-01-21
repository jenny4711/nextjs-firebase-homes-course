
import { getPropertyById } from '../../../../data/properties';

export default async function Property({params}:{params:Promise<any>}){
const paramsValue = await params;
const property = await getPropertyById(paramsValue.propertyId)

  return<div>property page</div>
}