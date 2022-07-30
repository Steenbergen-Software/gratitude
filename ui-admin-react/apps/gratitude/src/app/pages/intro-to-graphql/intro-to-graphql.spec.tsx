import { render } from '@testing-library/react';

import IntroToGraphql from './intro-to-graphql';

describe('IntroToGraphql', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntroToGraphql />);
    expect(baseElement).toBeTruthy();
  });
});
