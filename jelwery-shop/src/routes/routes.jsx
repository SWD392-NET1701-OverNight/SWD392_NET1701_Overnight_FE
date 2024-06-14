import { Suspense } from 'react'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layout/common'
import AuthLayout from '../layout/auth'

const Login = lazy(() => import('../auth/Login'))
const Register = lazy(() => import('../auth/Register'))
const ForgetPassword = lazy(() => import('../auth/ForgetPassword'))
const HomePage = lazy(() => import('../page/home-page'))
const AboutPage = lazy(() => import('../page/about-page'))
const ProductList = lazy(() => import('../page/product-list'))
const MyAccount = lazy(() => import('../page/my-acocunt'))
const ProductDetail = lazy(() => import('../page/product-detail'))
const Payment = lazy(() => import('../page/payment'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'product-list',
        element: (
          <Suspense>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: 'product-list/:productId',
        element: (
          <Suspense>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: 'my-account',
        element: (
          <Suspense>
            <MyAccount />
          </Suspense>
        ),
      },
      {
        path: 'payment',
        element: (
          <Suspense>
            <Payment />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'forget-password',
        element: (
          <Suspense>
            <ForgetPassword />
          </Suspense>
        ),
      },
    ],
  },
])
export default router
