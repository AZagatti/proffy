import React from 'react';
import { render } from '@testing-library/react';

import TeacherItem from '@components/TeacherItem';

describe('TeacherItem component', () => {
  it('should be able to render TeacherItem page', () => {
    const component = render(
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

    expect(component).toBeTruthy();
  });
});
