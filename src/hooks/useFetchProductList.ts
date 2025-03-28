import { Product } from '../types/product.types.ts';
import { client } from '../api/client.ts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const fetchProducts = async (
  keyword?: string,
  sortOrder: 'createdAt_ASC' | 'createdAt_DESC' | 'price_ASC' | 'price_DESC',
  page: number,
  take: number
): Promise<AxiosResponse<Product[], any>> => {
  let url = '/product/all?';

  if (keyword && keyword.trim() !== '') {
    url += `keyword=${encodeURIComponent(keyword)}&`;
  }

  // sortOrder를 분리하여 각각을 파라미터로 설정
  const [sort, order] = sortOrder.split('_') as [
    'createdAt' | 'price',
    'ASC' | 'DESC',
  ];

  const params = new URLSearchParams({
    sort,
    order,
    page: String(page),
    take: String(take || 10),
  });

  url += params.toString();

  return await client.get<Product[]>(url);
};

export const useFetchProducts = (
  keyword?: string,
  sortOrder: 'createdAt_ASC' | 'createdAt_DESC' | 'price_ASC' | 'price_DESC',
  page: number,
  take: number
): UseQueryResult<Product[], any> => {
  return useQuery<Product[], any>({
    queryKey: ['product', keyword, sortOrder, page, take],
    queryFn: async () => {
      const { data } = await fetchProducts(keyword, sortOrder, page, take);
      return data.body;
    },
    placeholderData: (prevData) => prevData ?? [],
  });
};
