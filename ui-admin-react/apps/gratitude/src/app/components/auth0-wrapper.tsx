import { PropsWithChildren, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appSettingsAtom, userAtom } from '../store';

// Using 2 components because we need to initialize the auth0 provider
// before using the auth0 react hooks.

/* eslint-disable-next-line */
export interface AuthWrapperProps extends PropsWithChildren {}

export function AuthWrapper(props: AuthWrapperProps) {
  const auth0 = useRecoilValue(appSettingsAtom)?.auth0;

  // Using Atom Effect, app will wait until config file is loaded. It can't be null here. Trust me :)
  if (!auth0) {
    throw new Error('Auth0 Configuration Missing.');
  }

  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      redirectUri={window.location.origin}
      audience={auth0.audience}
      scope={auth0.scope}
      // Can allow local storage to minimize roundtrips to auth server
      // if you're worried about XSS, don't use implicit flow at all. Bad actors don't need local storage to
      // lift your token *if* they can inject code. (e.g. wrap fetch function, etc.)
      cacheLocation={auth0.useBrowserLocalStorageCache ? 'localstorage' : undefined}
      // It uses refresh token rotation instead of relying on third party cookies.
      // Disable when using a *custom auth0 domain* (e.g. auth.{company-domain))
      // https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation
      useRefreshTokens={true}
    >
      <Auth0AtomMapper>
        {props.children}
      </Auth0AtomMapper>
    </Auth0Provider>
  );
}

// Kept inner component private (no export)
function Auth0AtomMapper(props: PropsWithChildren) {

  const [user, updateUser] = useRecoilState(userAtom)

  const { isAuthenticated, isLoading, user: auth0User } = useAuth0();
  useEffect(() => {

    // console.log('Auth0 Event: ', isAuthenticated, isLoading, auth0User, user, updateUser);

    // TODO: Handle isLoading state by showing suspense / loading indicator, TRUE is initial auth0 state so can be used to show <suspense>
    // if (isLoading) {  }

    if (isAuthenticated && auth0User) {
      // Update user atom *only* if different user (by email) is found to minimize state updates
      if (!user || user.email !== auth0User.email) {
        updateUser({
          email: auth0User.email || 'unknown',
          fullname: auth0User.name || 'unknown',
          username: auth0User.nickname || 'unknown',
        });
      }
    } else if (user) {
      // Clear user atom if user is not authenticated, when it is not already cleared
      updateUser(null);
    }

  }, [isAuthenticated, auth0User, isLoading, user, updateUser]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
    {props.children}
    </>
  )

}

export default AuthWrapper;
