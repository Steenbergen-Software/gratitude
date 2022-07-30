import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Navigation from './navigation';

describe('Navigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
