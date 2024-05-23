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
        loader: () => import('../page/home-page/HomePage').then((module) => module.loader()),
      },
      {
        path: 'auth',
        element: <AuthLayout />,
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
