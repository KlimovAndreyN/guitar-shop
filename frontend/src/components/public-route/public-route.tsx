import AccessRoute from '../access-route/access-route';
import { AppRouteProps } from '../../types';
import { AppRoute, AuthorizationStatus } from '../../const';

function PublicRoute({ children }: AppRouteProps): JSX.Element {
  return (
    <AccessRoute checkAuthorizationStatus={AuthorizationStatus.NoAuth} route={AppRoute.Main}>
      {children}
    </AccessRoute>
  );
}

export default PublicRoute;
