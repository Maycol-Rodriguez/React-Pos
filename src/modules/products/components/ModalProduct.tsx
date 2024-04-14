import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { useQueryBrands } from '@/brand/hooks';
import { useQueryCategories } from '@/categories/hooks';
import { useQueryProducts } from '@/products/hooks';
import { ProductForm, ProductSchema } from '@/products/schemas';
import { initialProduct } from '@/shared/constants';
import { useQueryUnits } from '@/units/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const ModalProduct = ({
  product,
  isOpen,
  setProduct,
  onClose,
  onOpenChange,
}: Props) => {
  const { getUnits } = useQueryUnits();
  const { getBrands } = useQueryBrands();
  const { postProduct } = useQueryProducts();
  const { getCategories } = useQueryCategories();

  const { data: units = [] } = getUnits;
  const { data: brands = [] } = getBrands;
  const { data: categories = [] } = getCategories;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialProduct,
  });

  useEffect(() => {
    if (product && product.id) {
      reset({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        codigo: product.codigo,
        precio: product.precio,
        stock: product.stock,
        stock_minimo: product.stock_minimo,
        categoria_id: product.categoria_id,
        marca_id: product.marca_id,
        unidad_id: product.unidad_id,
      });
    } else {
      reset();
    }
  }, [product, reset]);

  const formSubmit: SubmitHandler<ProductForm> = useCallback(
    async (data) => {
      if (data.id) {
        // updateCategory.mutate({ id: data.id, product: data });
      } else {
        postProduct.mutate(data);
      }
      reset();
      onClose();
      setProduct(initialProduct);
    },
    [onClose, postProduct, reset, setProduct],
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      scrollBehavior={'outside'}
      onClose={() => {
        setProduct(initialProduct);
      }}
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        {() => (
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex w-full flex-col flex-wrap gap-4 md:flex-nowrap"
          >
            <ModalHeader className="flex flex-col gap-1">
              {product.id ? 'Editar Producto' : 'Crear Producto'}
            </ModalHeader>
            <ModalBody>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    color={errors.nombre ? 'danger' : 'default'}
                    errorMessage={errors.nombre?.message}
                    label="Nombre"
                    labelPlacement="outside"
                    placeholder="Nombre del Producto"
                    size="lg"
                    radius="sm"
                    variant={errors.nombre ? 'bordered' : 'flat'}
                  />
                )}
              />

              <Controller
                name="codigo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    color={errors.codigo ? 'danger' : 'default'}
                    errorMessage={errors.codigo?.message}
                    label="Codigo"
                    labelPlacement="outside"
                    placeholder="Codigo del Producto"
                    size="lg"
                    radius="sm"
                    variant={errors.codigo ? 'bordered' : 'flat'}
                  />
                )}
              />

              <div className="flex flex-row gap-x-4">
                <Controller
                  name="precio"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color={errors.precio ? 'danger' : 'default'}
                      errorMessage={errors.precio?.message}
                      label="Precio"
                      labelPlacement="outside"
                      placeholder="Precio del Producto"
                      size="lg"
                      variant={errors.precio ? 'bordered' : 'flat'}
                      type="number"
                      radius="sm"
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />

                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color={errors.stock ? 'danger' : 'default'}
                      errorMessage={errors.stock?.message}
                      label="Stock"
                      labelPlacement="outside"
                      placeholder="Stock del Producto"
                      size="lg"
                      variant={errors.stock ? 'bordered' : 'flat'}
                      type="number"
                      radius="sm"
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(+e.target.value))}
                    />
                  )}
                />
              </div>

              <div className="flex flex-row gap-x-4">
                <Controller
                  name="stock_minimo"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color={errors.stock_minimo ? 'danger' : 'default'}
                      errorMessage={errors.stock_minimo?.message}
                      label="Stock Minimo"
                      labelPlacement="outside"
                      placeholder="Stock Minimo del Producto"
                      size="lg"
                      variant={errors.stock_minimo ? 'bordered' : 'flat'}
                      type="number"
                      radius="sm"
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(+e.target.value))}
                    />
                  )}
                />

                <Controller
                  name="categoria_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      size="lg"
                      radius="sm"
                      labelPlacement="outside"
                      label="Categoria"
                      placeholder="Seleccione Categori."
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(+e.target.value))}
                      color={errors.categoria_id ? 'danger' : 'default'}
                      errorMessage={errors.categoria_id?.message}
                      variant={errors.stock_minimo ? 'bordered' : 'flat'}
                    >
                      {categories.map((category, index) => (
                        <SelectItem
                          key={category.id ?? index}
                          value={category.id}
                        >
                          {category.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-row gap-x-4">
                <Controller
                  name="marca_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      size="lg"
                      radius="sm"
                      color={errors.marca_id ? 'danger' : 'default'}
                      errorMessage={errors.marca_id?.message}
                      variant={errors.stock_minimo ? 'bordered' : 'flat'}
                      labelPlacement="outside"
                      label="Marca"
                      placeholder="Seleccione Marca"
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(+e.target.value))}
                    >
                      {brands.map((category, index) => (
                        <SelectItem
                          key={category.id ?? index}
                          value={category.id}
                        >
                          {category.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name="unidad_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      size="lg"
                      radius="sm"
                      color={errors.unidad_id ? 'danger' : 'default'}
                      errorMessage={errors.unidad_id?.message}
                      variant={errors.stock_minimo ? 'bordered' : 'flat'}
                      labelPlacement="outside"
                      label="Unidad"
                      placeholder="Seleccione Unidad"
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(+e.target.value))}
                    >
                      {units.map((unit, index) => (
                        <SelectItem key={unit.id ?? index} value={unit.id}>
                          {unit.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>

              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    color={errors.descripcion ? 'danger' : 'default'}
                    errorMessage={errors.descripcion?.message}
                    label="Descripcion"
                    labelPlacement="outside"
                    placeholder="Descripcion del Producto"
                    size="lg"
                    radius="sm"
                    variant={errors.descripcion ? 'bordered' : 'flat'}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                {product.id ? 'Actualizar' : 'Crear'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  product: ProductForm;
  onClose: () => void;
  setProduct: (product: ProductForm) => void;
}
