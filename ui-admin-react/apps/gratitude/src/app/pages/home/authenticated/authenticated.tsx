import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { supportEmailState } from '../../../store';

/* eslint-disable-next-line */
export interface AuthenticatedProps {}

export function Authenticated(props: AuthenticatedProps) {
  const supportEmail = useRecoilValue(supportEmailState);

      // Testing management API from SPA:
    // https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-tokens-for-single-page-applications
    const loadAdditionalUserData = async (user: User) => {
      const claims = await getIdTokenClaims();
      const accessToken = await getAccessTokenWithPopup({
        audience: 'https://arturo-dev.us.auth0.com/api/v2/',
        scope: 'read:current_user',
      });

      console.log(claims, accessToken);

      const res = await fetch('https://arturo-dev.us.auth0.com/api/v2/users/' + user.sub, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      console.log('user data', data);
    };


  return (
    <div>
      <h1>Welcome</h1>
      <p>
        Welcome to Arturo's Developer Portal. Here you'll find comprehensive documentation, resources, and support so
        you can start innovating with our GraphQL API as quickly as possible.
      </p>
      <ol>
        <li>
          <Link to="/api-requests">Requests</Link>
        </li>
        <li>
          <Link to="/data-dictionary">Data Dictionary</Link>
        </li>
        <li>
          <Link to="/release-notes">Release Notes</Link>
        </li>
      </ol>
      <div>
        <h2>Need Support?</h2>
        <p>If you have questions or problems please submit your question to our team by emailing:</p>
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
      </div>
    </div>
  );
}

export default Authenticated;
