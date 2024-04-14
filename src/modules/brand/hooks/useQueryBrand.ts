import { BrandsService } from '@/brand/services';
import { useQuery } from '@tanstack/react-query';

export const useQueryBrands = () => {
  const getBrands = useQuery({
    queryKey: ['brands'],
    queryFn: BrandsService.getBrands,
  });

  return { getBrands };
};
