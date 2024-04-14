import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(3, 'El nombre del producto debe tener al menos 3 caracteres'),
  descripcion: z.string().optional(),
  codigo: z.string().min(3, 'El código del producto debe tener al menos 1 caracter'),
  precio: z.coerce
    .number()
    .positive('Debe ser mayor a 0')
    .min(1, 'El precio del producto debe ser mayor a 0'),
  stock: z.coerce
    .number()
    .int('Debe ser un número entero')
    .positive('Debe ser mayor a 0')
    .min(1, 'El stock mínimo del producto debe ser mayor a 0'),
  stock_minimo: z.coerce
    .number()
    .int('Debe ser un número entero')
    .positive('Debe ser mayor a 0')
    .min(1, 'El stock mínimo es requerida'),
  categoria_id: z.coerce.number().min(1, 'La categoria es requerida'),
  marca_id: z.coerce.number().min(1, 'La marca es requerida'),
  unidad_id: z.coerce.number().min(1, 'La unidad es requerida'),
});

export type ProductForm = z.infer<typeof ProductSchema>;
