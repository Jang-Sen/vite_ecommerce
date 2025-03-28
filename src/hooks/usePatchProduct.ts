import { ProductInput } from '../types/product.types.ts';
import { AxiosResponse } from 'axios';
import { client } from '../api/client.ts';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const patchProduct = async (
  productId: string,
  productInput: ProductInput
): Promise<AxiosResponse<ProductInput>> => {
  return await client.put<ProductInput>(`/product/${productId}`, productInput);
};

export const usePatchProduct = (
  productId: string
): UseMutationResult<
  AxiosResponse<ProductInput>,
  unknown,
  ProductInput,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (productInput: ProductInput) => {
      return await patchProduct(productId, productInput);
    },
    onSuccess: () => {
      alert('수정 완료');
      queryClient.invalidateQueries({ queryKey: ['product', productId] }); // 개별 상품 정보 갱신

      navigate(-1);
    },
    onError: (error) => {
      console.error('Error: ', error);
      alert('수정 중 문제가 발생했습니다.');
    },
  });
};
