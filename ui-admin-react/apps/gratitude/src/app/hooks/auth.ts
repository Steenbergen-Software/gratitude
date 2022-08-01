import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
  const { getAccessTokenSilently, loginWithRedirect, logout: auth0Logout } = useAuth0();

  const getApiToken = async () => getAccessTokenSilently();
  const login = () => loginWithRedirect();
  const logout = (returnTo?: string) => auth0Logout({ returnTo: returnTo || window.location.origin });

  return {
    getApiToken: useCallback(getApiToken, [getAccessTokenSilently]),
    login: useCallback(login, [loginWithRedirect]),
    logout: useCallback(logout, [auth0Logout]),
  };
}
