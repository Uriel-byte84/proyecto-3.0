export type Category = 'todos' | 'novedades' | 'grillitos' | 'grillitas' | 'minigrillito' | 'minigrillita';

export interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: Category;
  descripcion?: string;
  media_url: string;
  imagen?: string;
  archivo?: string;
  stock: number;
  tipo: 'image' | 'video';
  es_video?: boolean;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOption {
  id: Category;
  label: string;
}

export const PAYMENT_METHODS = [
  'Transferencia Bancaria',
  'Efectivo',
  'Mercado Pago',
] as const;

export const DELIVERY_METHODS = [
  'Retirar en tienda',
  'Envío a domicilio',
] as const;

export const FILTER_OPTIONS: ReadonlyArray<FilterOption> = [
  { id: 'todos', label: 'Todos' },
  { id: 'novedades', label: 'Novedades' },
  { id: 'grillitos', label: 'Grillitos' },
  { id: 'grillitas', label: 'Grillitas' },
  { id: 'minigrillito', label: 'Mini Grillito' },
  { id: 'minigrillita', label: 'Mini Grillita' },
];
