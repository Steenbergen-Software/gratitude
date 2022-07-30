import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Altair from './altair';

describe('Altair', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <MemoryRouter>
          <Altair />
        </MemoryRouter>
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
