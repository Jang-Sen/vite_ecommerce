import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main.tsx';
import App from '../App.tsx';
import Error from '../pages/Error.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);
