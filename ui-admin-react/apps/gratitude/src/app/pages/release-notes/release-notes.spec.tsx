import { render } from '@testing-library/react';

import ReleaseNotes from './release-notes';

describe('ReleaseNotes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReleaseNotes />);
    expect(baseElement).toBeTruthy();
  });
});
