import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main.tsx';
import App from '../App.tsx';
import Error from '../pages/Error.tsx';
import ProductList from '../pages/product/ProductList.tsx';
import Product from '../pages/product/Product.tsx';
import CreateProduct from '../pages/product/CreateProduct.tsx';
import UpdateProduct from '../pages/product/UpdateProduct.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/products',
        element: <ProductList />,
      },
      {
        path: '/product/:productId',
        element: <Product />,
      },
      {
        path: '/product/new',
        element: <CreateProduct />,
      },
      {
        path: '/product/update/:productId',
        element: <UpdateProduct />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);
