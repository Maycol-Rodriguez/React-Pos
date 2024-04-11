import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  descripcion: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres'),
});

export type CategoryForm = z.infer<typeof CategorySchema>;
