import React from 'react';
import { render } from '@testing-library/react';

import PageHeader from '@components/PageHeader';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('PageHeader component', () => {
  it('should be able to render PageHeader page', () => {
    const { getByText } = render(<PageHeader title="Test" />);

    const title = getByText('Test');

    expect(title).toBeInTheDocument();
  });
});
