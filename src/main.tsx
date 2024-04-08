import ReactDOM from 'react-dom/client';

import { Providers } from '@/shared/providers';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './router';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={AppRouter} />
  </Providers>,
);
