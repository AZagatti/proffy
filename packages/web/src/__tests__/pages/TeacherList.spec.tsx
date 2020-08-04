import React from 'react';
import { render } from '@testing-library/react';

import TeacherList from '@pages/TeacherList';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('TeacherList Page', () => {
  it('should be able to render TeacherList page', () => {
    const component = render(<TeacherList />);

    expect(component).toBeTruthy();
  });
});
