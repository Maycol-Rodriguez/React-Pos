import { BrandsService } from '@/brand/services';
import { useQuery } from '@tanstack/react-query';

export const useQueryBrand = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: BrandsService.getBrands,
  });

  return { data, isLoading, isError };
};
