import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store';

export function useAuth() {

  const { getAccessTokenSilently, loginWithRedirect, logout: auth0Logout } = useAuth0();
  const user = useRecoilValue(userAtom);

  const getApiToken = async () => getAccessTokenSilently();
  const login = () => loginWithRedirect();
  const logout = (returnTo?: string) => auth0Logout({ returnTo: returnTo || window.location.origin });

  return {
    getApiToken,
    login,
    logout
  }

}
