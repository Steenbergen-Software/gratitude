import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { supportEmailState } from '../../../store';

/* eslint-disable-next-line */
export interface AuthenticatedProps {}

export function Authenticated(props: AuthenticatedProps) {
  const supportEmail = useRecoilValue(supportEmailState);

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
