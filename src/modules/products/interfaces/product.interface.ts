export interface Product {
  id: number;
  nombre: string;
  codigo: string;
  imagen?: string;
  descripcion: string;
  precio: string;
  fecha_vencimiento?: string;
  stock: number;
  stock_minimo: number;
  categoria_id: number;
  marca_id: number;
  created_at: string;
  updated_at: string;
  actions?: string;
}
