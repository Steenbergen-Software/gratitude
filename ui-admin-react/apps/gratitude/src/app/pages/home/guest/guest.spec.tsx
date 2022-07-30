import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Guest from './guest';

describe('Guest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Guest />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
