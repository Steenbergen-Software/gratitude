import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Shell from './shell';

describe('Shell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <MemoryRouter>
          <Shell />
        </MemoryRouter>
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
