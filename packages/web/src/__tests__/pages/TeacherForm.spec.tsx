import React from 'react';
import { render } from '@testing-library/react';

import TeacherForm from '@pages/TeacherForm';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('TeacherForm Page', () => {
  it('should be able to render TeacherForm page', () => {
    const component = render(<TeacherForm />);

    expect(component).toBeTruthy();
  });
});
