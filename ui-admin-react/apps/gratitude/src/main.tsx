import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './app/app';
import Auth0Wrapper from './app/components/auth0-wrapper';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

/*
RecoilRoot node should be first, other components in tree might require state (e.g. auth0 wrapper)
Suspense is used when Recoil is async loading default state (application is initializing)
*/

root.render(
  <StrictMode>
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Auth0Wrapper>
            <App></App>
          </Auth0Wrapper>
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  </StrictMode>
);
