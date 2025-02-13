import AccessRoute from '../access-route/access-route';
import { AppRouteProps } from '../../types';
import { AppRoute, AuthorizationStatus } from '../../const';

function PrivateRoute({ children }: AppRouteProps): JSX.Element {
  return (
    <AccessRoute checkAuthorizationStatus={AuthorizationStatus.Auth} route={AppRoute.Login}>
      {children}
    </AccessRoute>
  );
}

export default PrivateRoute;
