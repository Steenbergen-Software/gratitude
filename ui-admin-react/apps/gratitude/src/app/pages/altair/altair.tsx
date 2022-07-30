import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { apiUrlState } from '../../store';

export function Altair() {
  const { pathname } = useLocation();
  const apiUrl = useRecoilValue(apiUrlState);

  useLayoutEffect(() => {
    const parts = pathname.split('/');
    const hash = parts[parts.length - 1];

    if (['install', 'getting-started', 'tips', 'resources'].includes(hash)) {
      const headerElement = document.getElementById(hash);

      headerElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [pathname]);

  return (
    <div>
      <h1 id="install">How to use Arturo's GraphQL API using the Altair GraphQL Client</h1>
      <p>
        This page will walk you through the steps for setting up and making queries to Arturo's GraphQL API using
        Altair. You don't have to use Altair. GraphQL uses standard HTTP requests. We've just found Altair to be the
        easiest GraphQL client to use.
      </p>
      <h2>Install Altair</h2>
      <p>
        These instructions use the Google Chrome extension distribution of Altair because authentication using a
        pre-request script did not function properly with the MacOS version. However, these instructions are intended to
        work with any Altair installation available from the Altair website.
      </p>
      <p>
        1.{' '}
        <a
          href="https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja"
          rel="noreferrer"
          target="_blank"
        >
          Add the Altair extension to Google Chrome
        </a>
      </p>
      <h2 id="getting-started">Getting Started</h2>
      <p>2. Open Altair</p>
      <p>
        3. Enter the url for API 3.0, i.e. <a href={apiUrl}>{apiUrl}</a>
      </p>
      <p>
        <b>
          <i>If you get an error, that is expected because we need to authenticate all requests</i>
        </b>
      </p>
      <p>4. Add and enable the following Pre-Request script</p>
      <img src="assets/images/altair-pre-request.png" alt="" />

      <pre>
        {`
const nowInSeconds = () => Date.now() / 1000;
const tokenExpiry = localStorage.getItem("token_expiry") || 0;

if (nowInSeconds() >= Number(tokenExpiry)) {
// If the token expiry time has passed, fetch a new token from your auth server again (take note of the await)

const res = await altair.helpers.request('POST', 'http://arturo-dev.us.auth0.com/oauth/token', {
body: {'client_id': altair.helpers.getEnvironment("client_id"),
'client_secret': altair.helpers.getEnvironment("client_secret"),
'audience': 'https://api.arturo.ai',
'grant_type': 'password',
'username': altair.helpers.getEnvironment("username"),
'password': altair.helpers.getEnvironment("password")
},
headers: {'Content-Type': 'application/json'}
});
// res => { "token": "abcd", "expiry": 3600 }

// Store the received token and expiry in localStorage
// Alternatively you can set this in the active environment
// altair.helpers.setEnvironment("token", res.access_token);
// altair.helpers.setEnvironment("token_expiry", nowInSeconds() + res.expiry);
localStorage.setItem("token", res.access_token);
localStorage.setItem("token_expiry", nowInSeconds() + res.expires_in);
}

// Retrieve the token from localStorage
// const token = altair.helpers.getEnvironment("token");
const token = localStorage.getItem("token");

// Set the token as the \`token_env\` environment variable in Altair
altair.helpers.setEnvironment('token_env', token);
`}
      </pre>
      <p>5. Set the Authorization header for each request to Bearer {`{{token_env}}`}</p>
      <img src="assets/images/altair-set-headers.png" alt="" />
      <p>6. Set your authentication secrets in a new environment. Be sure to activate the new environment</p>
      <img src="assets/images/altair-set-environment.png" alt="" />
      <pre>
        {`
{
 "client_id": "<client id>",
 "client_secret": "<client secret>",
 "username": "<email>",
 "password": "<password>"
}
`}
      </pre>
      <p>
        7. Test that authentication is working by browsing the documentation using the Docs button or clicking Reload
        Docs
      </p>
      <img src="assets/images/altair-docs.png" alt="" />
      <p>8. Make your first query. Add the following to the Query window and click Run query or Send Request</p>
      <pre>
        {`
{
  byLatLon(latitude: -31.912871, longitude: 115.914372) {
    id
    overview {
      structures {
        totalCt
      }
      acUnits {
        totalCt
        onGroundCt
        onRoofCt
      }
      solarPanels {
        totalCt
        onGroundCt
        onGroundArea
        onRoofCt
        onRoofArea
      }
      pools {
        totalCt
        aboveGroundCt
        inGroundCt
      }
      trampolines {
        totalCt
      }
    }
  }
}
`}
      </pre>
      <h2 id="tips">Tips</h2>
      <p>1. Increase the 'Add query' functionality depth to 20 under settings</p>
      <ul>
        <li>
          This will ensure your query is well-formed when using{' '}
          <a
            href="https://altair.sirmuel.design/docs/features/add-queries-and-fragments.html"
            rel="noreferrer"
            target="_blank"
          >
            One-click Query Generation
          </a>
        </li>
      </ul>
      <p>
        2. Use{' '}
        <a href="https://graphql.org/learn/queries/#variables" rel="noreferrer" target="_blank">
          Variables
        </a>
      </p>
      <h2 id="resources">GraphQL Resources</h2>
      <p>
        1.{' '}
        <a href="https://graphql.org/learn/" rel="noreferrer" target="_blank">
          Introduction to GraphQL | GraphQL
        </a>
      </p>
      <p>
        2.{' '}
        <a href="https://altair.sirmuel.design/docs/" rel="noreferrer" target="_blank">
          Getting Started
        </a>
      </p>
    </div>
  );
}

export default Altair;
