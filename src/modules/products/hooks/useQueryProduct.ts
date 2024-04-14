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
      console.log(error);
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return { getProducts, postProduct };
};
