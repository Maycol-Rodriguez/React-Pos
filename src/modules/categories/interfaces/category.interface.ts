export interface Category {
  id?: number;
  nombre: string;
  descripcion: string;
  created_at?: string;
  updated_at?: string;
  actions?: string;
}

// TODO: Verificar estructura de respuesta a las mutaciones
export interface CategoryResponse {
  mensaje: string;
}
