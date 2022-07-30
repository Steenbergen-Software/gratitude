import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Authenticated from './authenticated';

describe('Authenticated', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <Authenticated />
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
