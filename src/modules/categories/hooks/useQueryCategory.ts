import { CategoryForm } from '@/categories/schemas';
import { CategoriesService } from '@/categories/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useQueryCategory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesService.getCategories,
  });

  return { data, isLoading, isError };
};

export const usePostCategory = () => {
  const queryClient = useQueryClient();
  const { isError, mutate } = useMutation({
    mutationFn: (categoryForm: CategoryForm) =>
      CategoriesService.createCategory(categoryForm),
    onMutate: async () => {
      toast.loading('Creando categoria...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return { isError, mutate };
};
