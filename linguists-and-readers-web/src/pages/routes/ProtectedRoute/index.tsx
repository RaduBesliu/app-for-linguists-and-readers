import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LocalComponents } from './styled.ts';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../../providers/AuthProvider/context.ts';

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectTo: string;
  inverted?: boolean;
}

const ProtectedRoute = ({ children, redirectTo, inverted }: ProtectedRouteProps) => {
  const { user, currentProfile } = useContext(AuthContext);

  return (
    <>
      {inverted ? (
        user !== null ? (
          !user ? (
            children ? (
              children
            ) : (
              <Outlet />
            )
          ) : (
            <Navigate to={redirectTo} replace />
          )
        ) : (
          <LocalComponents.Container>
            <CircularProgress />
          </LocalComponents.Container>
        )
      ) : user !== null && currentProfile !== null ? (
        user ? (
          children ? (
            children
          ) : (
            <Outlet />
          )
        ) : (
          <Navigate to={redirectTo} replace />
        )
      ) : (
        <LocalComponents.Container>
          <CircularProgress />
        </LocalComponents.Container>
      )}
    </>
  );
};

export default ProtectedRoute;
