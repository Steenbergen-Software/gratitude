import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { graphqlTypes } from '../graphql.mocks';

import GraphqlTypeLabel from './graphql-type-label';

describe('GraphqlTypeLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <GraphqlTypeLabel graphqlType={graphqlTypes[0]} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
