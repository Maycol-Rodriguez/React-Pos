import { CategoriesService } from '@/categories/services';
import { useQuery } from '@tanstack/react-query';

export const useQueryCategory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesService.getCategories,
  });

  return { data, isLoading, isError };
};
