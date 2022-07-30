import { render } from '@testing-library/react';
import { graphqlTypes } from '../graphql.mocks';
import BusinessView from './business-view';

describe('BusinessView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BusinessView graphqlTypes={graphqlTypes} tier={''} tiers={['BASELINE', 'ENHANCED']} />
    );
    expect(baseElement).toBeTruthy();
  });
});
