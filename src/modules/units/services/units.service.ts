import { http } from '@/shared/config';
import { isAxiosError } from 'axios';
import { Unit } from '@/units/interfaces';

export class UnitsService {
  static getUnits = async (): Promise<Unit[]> => {
    try {
      const { data } = await http<Unit[]>('/unidades');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Ocurrió un error al obtener las unidades');
    }
  }
}