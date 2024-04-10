import { Product } from '@/products/interfaces';
import { http } from '@/shared/config';
import { isAxiosError } from 'axios';

export class ProductsService {
  static getProducts = async (): Promise<Product[]> => {
    try {
      const { data } = await http<Product[]>('/productos');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al obtener las categorías');
    }
  };
}
