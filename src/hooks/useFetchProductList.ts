import { AxiosResponse } from 'axios';
import { Product } from '../types/product.types.ts';
import { client } from '../api/client.ts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchProducts = async (
  sort: string,
  order: string,
  page: number,
  take: number
): Promise<AxiosResponse<Product[]>> => {
  return await client.get<Product[]>(
    `/product/all?sort=${sort}&order=${order}&page=${page}&take=${take}`
  );
};

export const useFetchProducts = (
  sort: string,
  order: string,
  page: number,
  take: number
): UseQueryResult<Product[], any> => {
  return useQuery<Product[], any>({
    queryKey: ['product', sort, order, page, take],
    queryFn: async () => {
      const { data } = await fetchProducts(sort, order, page, take);

      return data.body;
    },
  });
};
