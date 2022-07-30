import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/user';

export function Login() {
  const user = useRecoilValue(userAtom);
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {user && <Navigate to="/" />}
      <div>
        <button onClick={() => loginWithRedirect({})}>Login Redirect</button>
        <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
      </div>
    </>
  );
}

export default Login;
