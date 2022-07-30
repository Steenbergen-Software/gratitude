import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Home from './home';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
