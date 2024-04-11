import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { usePostCategory, useUpdateCategory } from '@/categories/hooks';
import { CategoryForm, CategorySchema } from '@/categories/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const CustomModal = ({
  category,
  isOpen,
  setCategory,
  onClose,
  onOpenChange,
}: Props) => {
  const postCategory = usePostCategory();
  const updateCategory = useUpdateCategory();

  const { control, reset, handleSubmit } = useForm<CategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { nombre: '', descripcion: '' },
  });

  useEffect(() => {
    if (category && category.id) {
      reset({
        id: category.id,
        nombre: category.nombre,
        descripcion: category.descripcion,
      });
    } else {
      reset({ nombre: '', descripcion: '' });
    }
  }, [category, reset]);

  const formSubmit: SubmitHandler<CategoryForm> = useCallback(
    async (data) => {
      if (data.id) {
        updateCategory.mutate({ id: data.id, category: data });
      } else {
        postCategory.mutate(data);
      }
      reset();
      onClose();
      setCategory({ nombre: '', descripcion: '' });
    },
    [onClose, postCategory, reset, setCategory, updateCategory],
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      onClose={() => {
        setCategory({ nombre: '', descripcion: '' });
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
              {category.id ? 'Editar Categoria' : 'Crear Categoria'}
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
              <Button type="submit" color="primary">
                {category.id ? 'Actualizar' : 'Crear'}
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
  category: CategoryForm;
  onClose: () => void;
  setCategory: (category: CategoryForm) => void;
}
