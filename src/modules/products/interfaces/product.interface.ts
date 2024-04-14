export interface Product {
  id?: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  precio: number;
  stock: number;
  stock_minimo: number;
  categoria_id: number;
  marca_id: number;
  unidad_id: number;
  imagen?: string;
  created_at?: string;
  updated_at?: string;
  fecha_vencimiento?: Date;
  estado: State;
  categoria: Category;
  marca: Category;
  unidad: Category;
  actions?: string;
}
export interface ProductResponse {
  mensaje: string;
}

interface Category {
  id: number;
  nombre: string;
}

enum State {
  Activo = 'activo',
  Inactivo = 'inactivo',
}
