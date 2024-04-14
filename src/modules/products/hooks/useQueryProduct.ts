import { ProductForm } from '@/products/schemas';
import { ProductsService } from '@/products/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useQueryProducts = () => {
  const queryClient = useQueryClient();

  const getProducts = useQuery({
    queryKey: ['products'],
    queryFn: ProductsService.getProducts,
  });

  const postProduct = useMutation({
    mutationFn: (product: ProductForm) =>
      ProductsService.createProduct(product),
    onMutate: async () => {
      toast.loading('Creando producto...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: number) => ProductsService.deleteProduct(id),
    onMutate: async () => {
      toast.loading('Eliminando producto...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const updateProduct = useMutation({
    mutationFn: (data: { id: number; product: ProductForm }) =>
      ProductsService.updateProduct(data.id, data.product),
    onMutate: async () => {
      toast.loading('Actualizando producto...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return { getProducts, postProduct, deleteProduct, updateProduct };
};
