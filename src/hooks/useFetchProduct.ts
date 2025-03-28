import { AxiosResponse } from 'axios';
import { client } from '../api/client.ts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Product } from '../types/product.types.ts';

const fetchProduct = async (
  productId: string
): Promise<AxiosResponse<Product>> => {
  return await client.get<Product>(`/product/${productId}`);
};

export const useFetchProduct = (
  productId: string
): UseQueryResult<Product, any> => {
  return useQuery<Product, any>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await fetchProduct(productId);

      return data.body;
    },
  });
};
