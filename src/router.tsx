import { AppLayout } from '@/app/layouts';
import { AuthLayout } from '@/auth/layouts';
import { LoginPage, RegisterPage } from '@/auth/pages';
import { routes } from '@/shared/routes';
import { createBrowserRouter } from 'react-router-dom';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      ...routes.map(({ element: Element, path }) => ({
        element: <Element />,
        path: path,
      })),
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);
