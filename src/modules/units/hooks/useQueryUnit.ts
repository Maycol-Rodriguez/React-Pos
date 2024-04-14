import { UnitsService } from '@/units/services';
import { useQuery } from '@tanstack/react-query';

export const useQueryUnits = () => {
  const getUnits = useQuery({
    queryKey: ['units'],
    queryFn: UnitsService.getUnits,
  });

  return { getUnits };
};
