export interface Unit {
  id?: number;
  nombre: string;
  estado: Estado;
  created_at?: Date;
  updated_at?: Date;
  actions?: string;
}

export enum Estado {
  Activo = 'activo',
  Inactivo = 'inactivo',
}
