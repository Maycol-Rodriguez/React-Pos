import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number().optional(),
  nombre: z
    .string()
    .min(3, 'El nombre del producto debe tener al menos 3 caracteres'),
  descripcion: z.string().optional(),
  codigo: z
    .string()
    .min(1, 'El código del producto debe tener al menos 1 caracter'),
  precio: z
    .number()
    .positive()
    .min(1, 'El precio del producto debe ser mayor a 0'),
  stock: z
    .number()
    .positive()
    .min(1, 'El stock del producto debe ser mayor a 0'),
  stock_minimo: z
    .number()
    .positive()
    .min(1, 'El stock mínimo del producto debe ser mayor a 0'),
  categoria_id: z.number().positive().min(1, 'La categoría es requerida'),
  marca_id: z.number().positive().min(1, 'La marca es requerida'),
  unidad_id: z.number().positive().min(1, 'La unidad es requerida'),
});

export type ProductForm = z.infer<typeof ProductSchema>;
