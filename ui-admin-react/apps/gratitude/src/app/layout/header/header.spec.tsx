import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
