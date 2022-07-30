import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Login from './login';

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
