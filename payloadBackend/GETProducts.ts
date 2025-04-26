"use server"
import { Products } from '@/payload-types'; // import your Products type
import { getPayloadClient } from './server';

export const fetchProducts = async (): Promise<Products[]> => {
  const payload = await getPayloadClient();
  const products = await payload.find({
    collection: "products",
  });

  return products.docs as Products[];
}
