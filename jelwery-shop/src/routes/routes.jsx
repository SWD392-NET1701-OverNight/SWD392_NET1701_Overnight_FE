import { Suspense } from 'react'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layout/common'
import AuthLayout from '../layout/auth'
import DashBoardLayout from '../layout/dashboard'

const Login = lazy(() => import('../auth/Login'))
const Register = lazy(() => import('../auth/Register'))
const ForgetPassword = lazy(() => import('../auth/ForgetPassword'))

const HomePage = lazy(() => import('../page/home-page'))
const QuotationPage = lazy(() => import('../page/quotation'))
const ProductList = lazy(() => import('../page/product-list'))
const MyAccount = lazy(() => import('../page/my-acocunt'))
const ProductDetail = lazy(() => import('../page/product-detail'))
const Blog = lazy(() => import('../page/blog-page'))
const Payment = lazy(() => import('../page/payment'))
const CustomProduct = lazy(() => import('../page/custom-product'))
const RequestDesign = lazy(() => import('../page/request-design'))

const OrderManager = lazy(() => import('../page/dashboard/order'))
const CategoryManager = lazy(() => import('../page/dashboard/category'))
const ProductManager = lazy(() => import('../page/dashboard/product'))
const CustomerManager = lazy(() => import('../page/dashboard/customer'))
const StatisticManager = lazy(() => import('../page/dashboard/statistic'))
const DesignManager = lazy(() => import('../page/dashboard/design'))
const MaterialManager = lazy(() => import('../page/dashboard/materials'))
const FeedbackManager = lazy(() => import('../page/dashboard/feedback'))

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
        path: 'quotation',
        element: (
          <Suspense>
            <QuotationPage />
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
        path: 'custom-product',
        element: (
          <Suspense>
            <CustomProduct />
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
        path: 'blog',
        element: (
          <Suspense>
            <Blog />
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
      {
        path: 'request-design',
        element: (
          <Suspense>
            <RequestDesign />
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
  {
    path: 'dashboard',
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <OrderManager />
          </Suspense>
        ),
      },
      {
        path: 'category',
        element: (
          <Suspense>
            <CategoryManager />
          </Suspense>
        ),
      },
      {
        path: 'product',
        element: (
          <Suspense>
            <ProductManager />
          </Suspense>
        ),
      },
      {
        path: 'customer',
        element: (
          <Suspense>
            <CustomerManager />
          </Suspense>
        ),
      },
      {
        path: 'statictis',
        element: (
          <Suspense>
            <StatisticManager />
          </Suspense>
        ),
      },
      {
        path: 'design',
        element: (
          <Suspense>
            <DesignManager />
          </Suspense>
        ),
      },
      {
        path: 'materials',
        element: (
          <Suspense>
            <MaterialManager />
          </Suspense>
        ),
      },
      {
        path: 'feedback',
        element: (
          <Suspense>
            <FeedbackManager />
          </Suspense>
        ),
      },
    ],
  },
])
export default router
