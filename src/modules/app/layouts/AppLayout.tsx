import { routes } from '@/shared/routes';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

export const AppLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <aside className="fixed inset-0 z-50 h-[calc(100vh)] w-72 -translate-x-80 rounded-r-md bg-gradient-to-br from-gray-800 to-gray-900 transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 px-8 py-6" href="#/">
            <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
              Material Tailwind Dashboard
            </h6>
          </a>
          <button
            className="middle none absolute right-0 top-0 grid h-8 max-h-[32px] w-8 max-w-[32px] rounded-lg rounded-br-none rounded-tl-none text-center font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none xl:hidden"
            type="button"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            {routes.map(({ path, icon: Icon, name }) => (
              <li key={path}>
                <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? 'middle none center flex w-full items-center gap-4 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 px-4 py-3 font-sans text-xs font-bold capitalize text-white shadow-md shadow-blue-500/20 transition-all duration-700 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                      : 'middle none center flex w-full items-center gap-4 rounded-lg px-4 py-3 font-sans text-xs font-bold capitalize text-white transition-all duration-700 hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';
                  }}
                  to={path}
                >
                  <Icon size={30} />
                  <p className="block font-sans text-base font-medium capitalize leading-relaxed text-inherit antialiased">
                    {name}
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mb-2 mt-4">
              <p className="block font-sans text-sm font-black uppercase leading-normal text-white antialiased opacity-75">
                auth pages
              </p>
            </li>
            <li>
              <a className="" href="#">
                <button
                  className="middle none center flex w-full items-center gap-4 rounded-lg px-4 py-3 font-sans text-xs font-bold capitalize text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block font-sans text-base font-medium capitalize leading-relaxed text-inherit antialiased">
                    sign in
                  </p>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button
                  className="middle none center flex w-full items-center gap-4 rounded-lg px-4 py-3 font-sans text-xs font-bold capitalize text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-inherit"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                  <p className="block font-sans text-base font-medium capitalize leading-relaxed text-inherit antialiased">
                    sign up
                  </p>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 xl:ml-80">
        <nav className="block w-full max-w-full rounded-xl bg-transparent px-0 py-1 text-white shadow-none transition-all">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
              <nav aria-label="breadcrumb" className="w-max">
                <ol className="flex w-full flex-wrap items-center rounded-md bg-transparent bg-opacity-60 p-0 transition-all">
                  <li className="text-blue-gray-900 hover:text-light-blue-500 flex cursor-pointer items-center font-sans text-sm font-normal leading-normal antialiased transition-colors duration-300">
                    <a href="#">
                      <p className="block font-sans text-sm font-normal leading-normal text-blue-900 antialiased opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                        dashboard
                      </p>
                    </a>
                    <span className="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-gray-500 antialiased">
                      /
                    </span>
                  </li>
                  <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-900 antialiased transition-colors duration-300 hover:text-blue-500">
                    <p className="text-blue-gray-900 block font-sans text-sm font-normal leading-normal antialiased">
                      {pathname.split('/', 2)}
                    </p>
                  </li>
                </ol>
              </nav>
              <h6 className="my-4 block font-sans text-2xl font-semibold leading-relaxed tracking-normal text-gray-900 antialiased">
                {pathname.split('/', 2)}
              </h6>
            </div>
            <div className="flex items-center">
              <button
                className="middle none hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 relative grid h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-gray-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none xl:hidden"
                type="button"
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    strokeWidth="3"
                    className="text-blue-gray-500 h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </button>
              <a href="#">
                <button
                  className="middle none center hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 rounded-lg px-4 py-3 font-sans text-xs font-bold uppercase text-gray-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none xl:flex"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue-gray-500 h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Sign In{' '}
                </button>
                <button
                  className="middle none hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 relative grid h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-gray-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none xl:hidden"
                  type="button"
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-blue-gray-500 h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </button>
              </a>
              <button
                className="middle none hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-gray-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue-gray-500 h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </button>
              <button
                aria-expanded="false"
                aria-haspopup="menu"
                id=":r2:"
                className="middle none hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-gray-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue-gray-500 h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <div>
          <Outlet />
          <Toaster
            richColors
            duration={2000}
            position="top-right"
            visibleToasts={4}
            toastOptions={{
              className: 'rounded-sm',
            }}
          />
        </div>
      </div>
    </div>
  );
};
