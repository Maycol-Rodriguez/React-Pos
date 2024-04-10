import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';

import {
  IoAdd,
  IoChevronDown,
  IoEllipsisVertical,
  IoSearch,
} from 'react-icons/io5';

import {
  useDeleteCategory,
  usePostCategory,
  useTableCategory,
} from '@/categories/hooks';

import { Category } from '@/categories/interfaces';
import { CategoryForm, CategorySchema } from '@/categories/schemas';
import { capitalize } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, useCallback, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const TableCategory = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const postCategory = usePostCategory();
  const deleteCategory = useDeleteCategory();

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
  } = useTableCategory();

  const { control, reset, handleSubmit } = useForm<CategoryForm>({
    defaultValues: {
      nombre: 'demo',
      descripcion: 'demo description',
    },
    resolver: zodResolver(CategorySchema),
  });

  const formSubmit: SubmitHandler<CategoryForm> = useCallback(
    (data: CategoryForm) => {
      postCategory.mutate(data);
      reset();
    },
    [postCategory, reset],
  );

  const renderCell = useCallback(
    (category: Category, columnKey: Key) => {
      const cellValue = category[columnKey as keyof Category];

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
                    <IoEllipsisVertical
                      size={20}
                      className="text-default-300"
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="ver categoria">
                  <DropdownItem onClick={() => console.log('Ver', category.id)}>
                    ver
                  </DropdownItem>
                  <DropdownItem>Editar</DropdownItem>
                  <DropdownItem
                    onPress={() => {
                      deleteCategory.mutate(category.id);
                    }}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteCategory],
  );

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
            <Button
              onPress={onOpen}
              color="primary"
              endContent={<IoAdd size={22} />}
            >
              Crear Nueva
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <form
                      onSubmit={handleSubmit(formSubmit)}
                      className="flex w-full flex-col flex-wrap gap-4 md:flex-nowrap"
                    >
                      <ModalHeader className="flex flex-col gap-1">
                        Crear Categoria
                      </ModalHeader>
                      <ModalBody>
                        <Controller
                          name="nombre"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="lg"
                              labelPlacement="outside"
                              label="Nombre"
                              placeholder="Nombre de la categoria"
                            />
                          )}
                        />

                        <Controller
                          name="descripcion"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="lg"
                              labelPlacement="outside"
                              label="Descripcion"
                              placeholder="Descripcion de la categoria"
                            />
                          )}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button type="submit" color="primary" onPress={onClose}>
                          crear
                        </Button>
                      </ModalFooter>
                    </form>
                  </>
                )}
              </ModalContent>
            </Modal>
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
    onOpen,
    isOpen,
    onOpenChange,
    categories.length,
    onRowsPerPageChange,
    onClear,
    handleSubmit,
    formSubmit,
    control,
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
