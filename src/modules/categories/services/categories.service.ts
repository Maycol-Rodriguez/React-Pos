import { Category } from '@/categories/interfaces';
import { CategoryForm } from '@/categories/schemas';
import { http } from '@/shared/config';
import { isAxiosError } from 'axios';

export class CategoriesService {
  static getCategories = async (): Promise<Category[]> => {
    try {
      const { data } = await http<Category[]>('/categorias');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al obtener las categorías');
    }
  };

  static createCategory = async (category: CategoryForm): Promise<string> => {
    try {
      const { data } = await http.post<PostResp>('/categorias', category);
      return data.mensaje;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al crear la categoría');
    }
  };
}

interface PostResp {
  mensaje: string;
}
