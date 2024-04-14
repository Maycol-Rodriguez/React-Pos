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
  const { getCategories } = useQueryCategories();
  const { postProduct, updateProduct } = useQueryProducts();

  const { data: units = [] } = getUnits;
  const { data: brands = [] } = getBrands;
  const { data: categories = [] } = getCategories;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: initialProduct,
    resolver: zodResolver(ProductSchema),
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
        updateProduct.mutate({ id: data.id, product: data });
      } else {
        postProduct.mutate(data);
      }
      reset();
      onClose();
      setProduct(initialProduct);
    },
    [onClose, postProduct, reset, setProduct, updateProduct],
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      scrollBehavior={'inside'}
      onClose={() => {
        setProduct(initialProduct);
      }}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
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
                    label="Nombre"
                    labelPlacement="inside"
                    placeholder="Nombre del Producto"
                    radius="sm"
                    size="md"
                    type="text"
                    color={errors.nombre ? 'danger' : 'default'}
                    errorMessage={errors.nombre?.message}
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
                    label="Codigo"
                    labelPlacement="inside"
                    placeholder="Codigo del Producto"
                    radius="sm"
                    size="md"
                    type="text"
                    color={errors.codigo ? 'danger' : 'default'}
                    errorMessage={errors.codigo?.message}
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
                      label="Precio"
                      labelPlacement="inside"
                      placeholder="Precio del Producto"
                      radius="sm"
                      size="md"
                      type="number"
                      color={errors.precio ? 'danger' : 'default'}
                      errorMessage={errors.precio?.message}
                      value={field.value?.toString()}
                      variant={errors.precio ? 'bordered' : 'flat'}
                    />
                  )}
                />

                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Stock"
                      labelPlacement="inside"
                      placeholder="Stock del Producto"
                      radius="sm"
                      size="md"
                      type="number"
                      color={errors.stock ? 'danger' : 'default'}
                      errorMessage={errors.stock?.message}
                      value={field.value?.toString()}
                      variant={errors.stock ? 'bordered' : 'flat'}
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
                      label="Stock Minimo"
                      labelPlacement="inside"
                      placeholder="Stock Minimo del Producto"
                      radius="sm"
                      size="md"
                      type="number"
                      color={errors.stock_minimo ? 'danger' : 'default'}
                      errorMessage={errors.stock_minimo?.message}
                      value={field.value?.toString()}
                      variant={errors.stock_minimo ? 'bordered' : 'flat'}
                    />
                  )}
                />

                <Controller
                  name="categoria_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Categoria"
                      labelPlacement="inside"
                      radius="sm"
                      size="md"
                      color={errors.categoria_id ? 'danger' : 'default'}
                      errorMessage={errors.categoria_id?.message}
                      isDisabled={getCategories.isLoading}
                      placeholder={
                        getCategories.isLoading
                          ? 'Cargando categorias..'
                          : 'Seleccione Categoria'
                      }
                      variant={errors.categoria_id ? 'bordered' : 'flat'}
                      onSelectionChange={(keys) =>
                        field.onChange(Number(Array.from(keys)[0]))
                      }
                      selectedKeys={
                        new Set(
                          field.value && !getCategories.isLoading
                            ? [field.value.toString()]
                            : [],
                        )
                      }
                    >
                      {!getCategories.isLoading ? (
                        categories?.map((category) => (
                          <SelectItem key={category.id!} value={category.id}>
                            {category.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" key={0}>
                          Cargando...
                        </SelectItem>
                      )}
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
                      label="Marca"
                      labelPlacement="inside"
                      radius="sm"
                      size="sm"
                      color={errors.marca_id ? 'danger' : 'default'}
                      errorMessage={errors.marca_id?.message}
                      isDisabled={getBrands.isLoading}
                      placeholder={
                        getBrands.isLoading ? 'Cargando marcas..' : 'Seleccione Marca'
                      }
                      variant={errors.marca_id ? 'bordered' : 'flat'}
                      onSelectionChange={(keys) =>
                        field.onChange(Number(Array.from(keys)[0]))
                      }
                      selectedKeys={
                        new Set(
                          field.value && !getBrands.isLoading
                            ? [field.value.toString()]
                            : [],
                        )
                      }
                    >
                      {!getBrands.isLoading ? (
                        brands?.map((brand) => (
                          <SelectItem key={brand.id!} value={brand.id?.toString()}>
                            {brand.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" key={0}>
                          Cargando...
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  name="unidad_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Unidad"
                      labelPlacement="inside"
                      radius="sm"
                      size="sm"
                      color={errors.unidad_id ? 'danger' : 'default'}
                      errorMessage={errors.unidad_id?.message}
                      isDisabled={getUnits.isLoading}
                      placeholder={
                        getUnits.isLoading ? 'Cargando unidad..' : 'Seleccione Unidad'
                      }
                      variant={errors.unidad_id ? 'bordered' : 'flat'}
                      onSelectionChange={(keys) =>
                        field.onChange(Number(Array.from(keys)[0]))
                      }
                      selectedKeys={
                        new Set(
                          field.value && !getUnits.isLoading
                            ? [field.value.toString()]
                            : [],
                        )
                      }
                    >
                      {!getUnits.isLoading ? (
                        units?.map((unit) => (
                          <SelectItem key={unit.id!} value={unit.id}>
                            {unit.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" key={0}>
                          Cargando...
                        </SelectItem>
                      )}
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
                    label="Descripcion"
                    labelPlacement="inside"
                    radius="sm"
                    size="md"
                    color={errors.descripcion ? 'danger' : 'default'}
                    errorMessage={errors.descripcion?.message}
                    placeholder="Descripcion del Producto"
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
