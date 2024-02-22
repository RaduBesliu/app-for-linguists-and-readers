import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProtectedRoute from './routes/ProtectedRoute';
import Sidebar from '../components/Sidebar';
import StoriesPage from './StoriesPage';
import DictionaryPage from './DictionaryPage';
import AlignmentsPage from './AlignmentsPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import AccountPage from './AccountPage';

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
    path: '/forgot-password',
    element: (
      <ProtectedRoute redirectTo={'/home'} inverted={true}>
        <ForgotPasswordPage />
      </ProtectedRoute>
    ),
  },
  {
    element: <Sidebar />,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute redirectTo={'/login'}>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/stories',
        element: (
          <ProtectedRoute redirectTo={'/login'}>
            <StoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dictionary',
        element: (
          <ProtectedRoute redirectTo={'/login'}>
            <DictionaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/alignments',
        element: (
          <ProtectedRoute redirectTo={'/login'}>
            <AlignmentsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/account',
        element: (
          <ProtectedRoute redirectTo={'/login'}>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const RouterComponent = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;
