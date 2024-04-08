import { AppPage } from '@/app/pages';
import { BrandPage } from '@/brand/pages';
import { CategoryPage } from '@/categories/pages';
import { ProductsPage } from '@/products/page';
import { CiBoxes } from 'react-icons/ci';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineCategory } from 'react-icons/md';
import { TbBrandUbuntu } from 'react-icons/tb';

export const routes = [
  {
    path: '/',
    name: 'Inicio',
    icon: HiOutlineHome,
    element: AppPage,
  },
  {
    path: '/categorias',
    name: 'Categorias',
    icon: MdOutlineCategory,
    element: CategoryPage,
  },
  {
    path: '/productos',
    name: 'Productos',
    icon: CiBoxes,
    element: ProductsPage,
  },
  {
    path: '/marcas',
    name: 'Marcas',
    icon: TbBrandUbuntu,
    element: BrandPage,
  },
];
