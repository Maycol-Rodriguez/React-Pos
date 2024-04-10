import { useQueryCategory } from '@/categories/hooks';
import { CategoryRes } from '@/categories/interfaces';
import { Selection, SortDescriptor } from '@nextui-org/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const columnsTable = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NOMBRE', uid: 'nombre', sortable: true },
  { name: 'DESCRIPCION', uid: 'descripcion', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['id', 'nombre', 'descripcion', 'actions'];

export const useTableCategory = () => {
  const { data: categories = [], isLoading } = useQueryCategory();

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
    let filteredCategories = [...categories];
    if (hasSearchFilter) {
      filteredCategories = filteredCategories.filter((category) =>
        category.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredCategories;
  }, [categories, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: CategoryRes, b: CategoryRes) => {
      const first = a[sortDescriptor.column as keyof CategoryRes] as number;
      const second = b[sortDescriptor.column as keyof CategoryRes] as number;
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
    categories,
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
