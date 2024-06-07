import { Suspense } from 'react'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const AuthLayout = lazy(() => import('../auth/layout/index'))
const Login = lazy(() => import('../auth/Login'))
const Register = lazy(() => import('../auth/Register'))
const ForgetPassword = lazy(() => import('../auth/ForgetPassword'))
const RootLayout = lazy(() => import('../layout/common/index'))
const HomePage = lazy(() => import('../page/home-page/index'))
const AboutPage = lazy(() => import('../page/about-page/index'))
const ProductList = lazy(() => import('../page/product-list/index'))
const MyAccount = lazy(() => import('../page/my-acocunt/index'))
const ProductDetail = lazy(() => import('../page/product-detail/index'))
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: (
          <Suspense>
            <RootLayout />
          </Suspense>
        ),
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
        ],
      },
      {
        path: 'auth',
        element: (
          <Suspense>
            <AuthLayout />
          </Suspense>
        ),
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
    ],
  },
])
export default router
