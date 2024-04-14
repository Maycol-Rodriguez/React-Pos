import { CategoryForm } from '@/categories/schemas';
import { ProductForm } from '@/products/schemas';

export const initialProduct: ProductForm = {
  nombre: '',
  codigo: '',
  precio: 0,
  stock: 0,
  stock_minimo: 0,
  categoria_id: 0,
  marca_id: 0,
  unidad_id: 0,
  descripcion: '',
};

export const initialCategory: CategoryForm = {
  nombre: '',
  descripcion: '',
};
