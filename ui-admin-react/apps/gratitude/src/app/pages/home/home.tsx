import { useRecoilValue } from 'recoil';
import { isAuthenticatedState } from '../../store/user';
import { Authenticated } from './authenticated';
import { Guest } from './guest';

export function Home() {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  return (
    <>
      {!isAuthenticated && <Guest />}
      {isAuthenticated && <Authenticated />}
    </>
  );
}

export default Home;
