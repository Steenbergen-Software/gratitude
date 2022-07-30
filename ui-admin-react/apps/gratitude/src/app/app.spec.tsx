import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </RecoilRoot>
    );

    expect(baseElement).toBeTruthy();
  });
});
