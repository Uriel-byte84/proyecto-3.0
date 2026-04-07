import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const sanitizedData: Product[] = (data || []).map((p: any) => ({
        ...p,
        nombre: p.nombre || 'Producto sin nombre',
        precio: Number(p.precio) || 0,
        categoria: (p.categoria as Category) || 'todos',
        stock: p.stock ?? 0,
        tipo: p.tipo || 'image',
        media_url: p.media_url || p.imagen || p.archivo || '/assets/products/logo.jpeg',
      }));

      setProducts(sanitizedData);
    } catch (err: any) {
      setError(err.message || 'Error al cargar productos');
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filterProducts = useCallback((category: Category, searchQuery: string = '') => {
    const cleanQuery = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const matchesCategory =
        category.toLowerCase() === 'todos' ||
        product.categoria.toLowerCase() === category.toLowerCase();

      const matchesQuery =
        !cleanQuery ||
        product.nombre.toLowerCase().includes(cleanQuery) ||
        (product.descripcion || '').toLowerCase().includes(cleanQuery);

      return matchesCategory && matchesQuery;
    });
  }, [products]);

  const updateStock = async (productId: string, newStock: number) => {
    try {
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: Math.max(0, newStock) })
        .eq('id', productId);

      if (updateError) throw updateError;

      setProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p)
      );
    } catch (err) {
      console.error('Error actualizando stock:', err);
      await loadProducts();
    }
  };

  return {
    products,
    loading,
    error,
    filterProducts,
    updateStock,
    reloadProducts: loadProducts
  };
}
