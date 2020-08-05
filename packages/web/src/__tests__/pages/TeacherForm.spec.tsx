import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '@proffy/axios-config';

import TeacherForm from '@pages/TeacherForm';

const apiMock = new MockAdapter(api);
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
  it('should be able to register a teacher', async () => {
    apiMock.onPost('classes').reply(200);
    const { findByTestId, findByText } = render(<TeacherForm />);

    jest.spyOn(window, 'alert').mockImplementationOnce(jest.fn());

    const nameInput = await findByTestId('name');
    const avatarInput = await findByTestId('avatar');
    const whatsappInput = await findByTestId('whatsapp');
    const bioInput = await findByTestId('bio');
    const subjectInput = await findByTestId('subject');
    const costInput = await findByTestId('cost');
    const weekDayInput = await findByTestId('week_day');
    const fromInput = await findByTestId('from');
    const toInput = await findByTestId('to');

    const submitButton = await findByText('Salvar cadastro');

    fireEvent.change(nameInput, {
      target: { value: 'John Doe' },
    });
    fireEvent.change(avatarInput, {
      target: { value: 'avatar.jpg' },
    });
    fireEvent.change(whatsappInput, {
      target: { value: '+11999999999' },
    });
    fireEvent.change(bioInput, {
      target: { value: 'A nice guy' },
    });
    fireEvent.change(subjectInput, {
      target: { value: 'História' },
    });
    fireEvent.change(costInput, {
      target: { value: '80' },
    });
    fireEvent.change(weekDayInput, {
      target: { value: 'Segunda-feira' },
    });
    fireEvent.change(fromInput, {
      target: { value: '0800' },
    });
    fireEvent.change(toInput, {
      target: { value: '1400' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
