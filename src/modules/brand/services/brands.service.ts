import { Brand } from '@/brand/interfaces';
import { http } from '@/shared/config';
import { isAxiosError } from 'axios';

export class BrandsService {
  static getBrands = async (): Promise<Brand[]> => {
    try {
      const { data } = await http<Brand[]>('/marcas');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al obtener las marcas');
    }
  };
}
