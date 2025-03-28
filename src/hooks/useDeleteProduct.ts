import { AxiosResponse } from 'axios';
import { client } from '../api/client.ts';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const deleteProduct = async (
  productId: string
): Promise<AxiosResponse<any>> => {
  return await client.delete<any>(`/product/${productId}`);
};

export const useDeleteProduct = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  any,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (productId: string) => {
      return await deleteProduct(productId);
    },
    onSuccess: (_, productId) => {
      alert('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['product'] }); // 전체 상품 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['product', productId] }); // 개별 상품 제거

      navigate(-1);
    },
    onError: (error: Error) => {
      console.error('Error: ', error);
    },
  });
};
