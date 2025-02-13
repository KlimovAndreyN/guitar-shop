import { Navigate } from 'react-router-dom';
import { AppRouteProps } from '../../types';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type AccessRouteProps = AppRouteProps & { checkAuthorizationStatus: AuthorizationStatus; route: string }

function AccessRoute({ checkAuthorizationStatus, children, route }: AccessRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  switch (authorizationStatus) {
    case checkAuthorizationStatus:
      return children;
  }

  return <Navigate to={route} />;
}

export default AccessRoute;
