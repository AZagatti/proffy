import React from 'react';
import { render } from '@testing-library/react';

import GenericNotFound from '@pages/GenericNotFound';

describe('GenericNotFound Page', () => {
  it('should be able to render GenericNotFound page', () => {
    const component = render(<GenericNotFound />);

    expect(component).toBeTruthy();
  });
});
