import React from 'react';
import { render } from '@testing-library/react';

import Landing from '@pages/Landing';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Landing Page', () => {
  it('should be able to render Landing page', () => {
    const component = render(<Landing />);

    expect(component).toBeTruthy();
  });
});
