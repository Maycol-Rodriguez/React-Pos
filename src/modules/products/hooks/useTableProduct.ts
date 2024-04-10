import { useQueryProduct } from '@/products/hooks';
import { Product } from '@/products/interfaces';
import { Selection, SortDescriptor } from '@nextui-org/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const columnsTable = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'CODIGO', uid: 'codigo', sortable: true },
  { name: 'PRECIO', uid: 'precio', sortable: true },
  { name: 'NOMBRE', uid: 'nombre', sortable: true },
  { name: 'STOCK', uid: 'stock', sortable: true },
  { name: 'STOCK MINIMO', uid: 'stock_minimo', sortable: true },
  { name: 'DESCRIPCION', uid: 'descripcion', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'codigo',
  'precio',
  'nombre',
  'stock',
  'stock_minimo',
  'descripcion',
  'actions',
];

export const useTableProducts = () => {
  const { data: products = [], isLoading } = useQueryProduct();

  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'data',
    direction: 'ascending',
  });

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columnsTable;
    return columnsTable.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products];
    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredProducts;
  }, [products, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor.column as keyof Product] as number;
      const second = b[sortDescriptor.column as keyof Product] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (!e.target.value) return;
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  return {
    products,
    isLoading,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    selectedKeys,
    setSelectedKeys,
    headerColumns,
    sortDescriptor,
    setSortDescriptor,
    page,
    setPage,
    pages,
    filterValue,
    setVisibleColumns,
    filteredItems,
    sortedItems,
    columnsTable,
  };
};
