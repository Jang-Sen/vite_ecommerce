import { AxiosResponse } from 'axios';
import { ProductInput } from '../types/product.types.ts';
import { client } from '../api/client.ts';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const createProduct = async (
  productInput: ProductInput
): Promise<AxiosResponse<ProductInput>> => {
  return await client.post<ProductInput>('/product/new', productInput);
};

export const useCreateProduct = (): UseMutationResult<
  AxiosResponse<ProductInput>,
  unknown,
  ProductInput,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (productInput: ProductInput) => {
      return await createProduct(productInput);
    },
    onSuccess: () => {
      alert('생성 완료');
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });

      navigate(-1);
    },
    onError: (error: Error) => {
      console.error('Create Error', error);
      alert('생성 중 문제가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
