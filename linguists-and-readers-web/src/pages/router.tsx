import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Root!</div>,
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute redirectTo={'/home'} inverted={true}>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute redirectTo={'/home'} inverted={true}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute redirectTo={'/login'}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);

const RouterComponent = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;
