import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '@proffy/axios-config';

import TeacherItem from '@components/TeacherItem';

const apiMock = new MockAdapter(api);

describe('TeacherItem component', () => {
  it('should be able to contact teacher', async () => {
    apiMock.onPost('connections').reply(200);
    const { findByText } = render(
      <TeacherItem
        teacher={{
          id: 0,
          name: 'John Doe',
          bio: 'Nice bio',
          cost: 80,
          avatar: 'nice-avatar.jpg',
          subject: 'Geográfia',
          whatsapp: '+55191919919',
        }}
      />,
    );

    const link = await findByText('Entrar em contato');

    fireEvent.click(link);

    expect(link).toHaveAttribute('href', 'https://wa.me/+55191919919');
  });
  it('should be able to catch erro in create new connection', async () => {
    apiMock.onPost('connections').reply(400);
    const { findByText } = render(
      <TeacherItem
        teacher={{
          id: 0,
          name: 'John Doe',
          bio: 'Nice bio',
          cost: 80,
          avatar: 'nice-avatar.jpg',
          subject: 'Geográfia',
          whatsapp: '+55191919919',
        }}
      />,
    );

    const link = await findByText('Entrar em contato');

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementationOnce(jest.fn());

    fireEvent.click(link);

    await waitFor(() => {
      expect(consoleSpy).toBeCalled();
    });
  });
});
