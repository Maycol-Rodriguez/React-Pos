import { CategoryRes } from '@/categories/interfaces';
import { http } from '@/shared/config';
import { isAxiosError } from 'axios';

export class CategoriesService {
  static getCategories = async (): Promise<CategoryRes[]> => {
    try {
      const { data } = await http<CategoryRes[]>('/categorias');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al obtener las categorías');
    }
  };
}

