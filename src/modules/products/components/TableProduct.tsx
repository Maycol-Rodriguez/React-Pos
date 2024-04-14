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
  useDisclosure,
} from '@nextui-org/react';

import { IoAdd, IoChevronDown, IoEllipsisVertical, IoSearch } from 'react-icons/io5';

import { ModalProduct } from '@/products/components';
import { useQueryProducts, useTableProducts } from '@/products/hooks';
import { Product } from '@/products/interfaces';
import { ProductForm } from '@/products/schemas';
import { Loader } from '@/shared/components';
import { initialProduct } from '@/shared/constants';
import { capitalize } from '@/shared/utils';
import { Key, useCallback, useMemo, useState } from 'react';

export const TableProduct = () => {
  const {
    products,
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
  } = useTableProducts();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [product, setProduct] = useState<ProductForm>(initialProduct);

  const { deleteProduct } = useQueryProducts();

  const renderCell = useCallback(
    (product: Product, columnKey: Key) => {
      const cellValue = product[columnKey as keyof Product];

      switch (columnKey) {
        case 'nombre':
          return product.nombre;
        case 'descripcion':
          return product.descripcion;
        case 'fecha_vencimiento':
          return product.fecha_vencimiento?.toLocaleDateString();
        case 'categoria':
          return product.categoria.nombre;
        case 'marca':
          return product.marca.nombre;
        case 'unidad':
          return product.unidad.nombre; // Asumiendo que el valor nd
        case 'actions':
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Dropdown aria-label="ver producto">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <IoEllipsisVertical size={20} className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="ver producto">
                  <DropdownItem onClick={() => console.log('Ver', product.id)}>
                    ver
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => {
                      if (!product.id) return;

                      setProduct({
                        id: product.id,
                        nombre: product.nombre,
                        codigo: product.codigo,
                        descripcion: product.descripcion,
                        precio: product.precio,
                        stock: product.stock,
                        stock_minimo: product.stock_minimo,
                        categoria_id: product.categoria_id,
                        marca_id: product.marca_id,
                        unidad_id: product.unidad_id,
                      });

                      onOpen();
                    }}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => product.id && deleteProduct.mutate(product.id)}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue?.toString();
      }
    },
    [deleteProduct, onOpen, setProduct],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar productos"
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
            <Button onPress={onOpen} color="primary" endContent={<IoAdd size={22} />}>
              Crear Nueva
            </Button>
            {isOpen && (
              <ModalProduct
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                product={product}
                setProduct={setProduct}
                onClose={onClose}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {products.length} productos
          </span>

          <label className="flex items-center text-small text-default-400">
            productos por pagina:
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
    onOpen,
    isOpen,
    onOpenChange,
    product,
    onClose,
    products.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos las productos seleccionados'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          boundaries={2}
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

  if (isLoading) return <Loader />;

  return (
    <Table
      aria-label="table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      isHeaderSticky
      isStriped
      layout="auto"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[590px]',
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
      <TableBody emptyContent={'No se encontraron productos'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              return <TableCell>{renderCell(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
