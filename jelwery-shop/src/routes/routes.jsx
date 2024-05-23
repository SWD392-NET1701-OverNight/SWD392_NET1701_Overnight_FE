import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = lazy(() => import('../page/home-page/HomePage'));
const AuthLayout = lazy(() => import('../auth/layout/index'));
const Login = lazy(() => import('../auth/Login'));
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => import('../utils/auth').then((mod) => mod.checkAuth()),
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        loader: () => import('../utils/auth').then((mod) => mod.checkIsLoging()),
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
export default router;
