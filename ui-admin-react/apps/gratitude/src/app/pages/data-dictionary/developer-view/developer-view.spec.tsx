import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { graphqlTypes } from '../graphql.mocks';

import DeveloperView from './developer-view';

describe('DeveloperView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <DeveloperView graphqlTypes={graphqlTypes} tier={''} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
