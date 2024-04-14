import { Product, ProductResponse } from '@/products/interfaces';
import { ProductForm } from '@/products/schemas';
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

  static createProduct = async (product: ProductForm): Promise<string> => {
    try {
      const { data } = await http.post<ProductResponse>('/productos', product);
      return data.mensaje;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al crear el producto');
    }
  };

  static deleteProduct = async (id: number): Promise<string> => {
    try {
      const { data } = await http.delete<ProductResponse>(`/productos/${id}`);
      return data.mensaje;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al eliminar el producto');
    }
  }

  static updateProduct = async (id: number, product: ProductForm): Promise<string> => {
    try {
      const { data } = await http.put<ProductResponse>(`/productos/${id}`, product);
      return data.mensaje;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al actualizar el producto');
    }
  }
}
