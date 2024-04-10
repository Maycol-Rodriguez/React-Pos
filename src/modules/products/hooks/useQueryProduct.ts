import { ProductsService } from '@/products/services';
import { useQuery } from '@tanstack/react-query';

export const useQueryProduct = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: ProductsService.getProducts,
  });

  return { data, isLoading, isError };
};
