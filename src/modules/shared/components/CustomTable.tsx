import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import {
  IoAdd,
  IoChevronDown,
  IoEllipsisVertical,
  IoSearch,
} from 'react-icons/io5';

import { CategoryRes } from '@/categories/interfaces';
import { useCustomTable } from '@/shared/hooks';
import { capitalize } from '@/shared/utils';
import { Key, useCallback, useMemo } from 'react';

export const CustomTable = () => {
  const {
    categories,
    columnsTable,
    filteredItems,
    filterValue,
    headerColumns,
    isLoading,
    onClear,
    onRowsPerPageChange,
    onSearchChange,
    page,
    pages,
    selectedKeys,
    setPage,
    setSelectedKeys,
    setSortDescriptor,
    setVisibleColumns,
    sortDescriptor,
    sortedItems,
    visibleColumns,
  } = useCustomTable();

  const renderCell = useCallback((category: CategoryRes, columnKey: Key) => {
    const cellValue = category[columnKey as keyof CategoryRes];

    switch (columnKey) {
      case 'nombre':
        return <span>{category.nombre}</span>;
      case 'descripcion':
        return category.descripcion;
      case 'actions':
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown aria-label="ver categoria">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <IoEllipsisVertical size={20} className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="ver categoria">
                <DropdownItem onClick={() => console.log('Ver', category.id)}>
                  ver
                </DropdownItem>
                <DropdownItem>Editar</DropdownItem>
                <DropdownItem>Eliminar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar categorias"
            startContent={<IoSearch size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<IoChevronDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsTable.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<IoAdd size={22} />}>
              Crear Nueva
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {categories.length} categorias
          </span>

          <label className="flex items-center text-small text-default-400">
            Categorias por pagina:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    setVisibleColumns,
    columnsTable,
    categories.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todas las categorias seleccionadas'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, setPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table
      aria-label="table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      isHeaderSticky
      isStriped
      layout="fixed"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[582px]',
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No se encontraron categorias'}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
