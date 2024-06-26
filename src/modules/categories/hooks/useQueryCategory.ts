import { CategoryForm } from '@/categories/schemas';
import { CategoriesService } from '@/categories/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useQueryCategories = () => {
  const queryClient = useQueryClient();

  const getCategories = useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesService.getCategories,
  });

  const postCategory = useMutation({
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

  const deleteCategory = useMutation({
    mutationFn: (id: number) => CategoriesService.deleteCategory(id),
    onMutate: async () => {
      toast.loading('Eliminando categoria...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const updateCategory = useMutation({
    mutationFn: (data: { id: number; category: CategoryForm }) =>
      CategoriesService.updateCategory(data.id, data.category),
    onMutate: async () => {
      toast.loading('Actualizando categoria...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return { getCategories, postCategory, deleteCategory, updateCategory };
};
