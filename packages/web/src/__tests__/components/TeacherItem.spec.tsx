import React from 'react';
import { render } from '@testing-library/react';

import TeacherItem from '@components/TeacherItem';

describe('TeacherItem component', () => {
  it('should be able to render TeacherItem page', () => {
    const component = render(<TeacherItem />);

    expect(component).toBeTruthy();
  });
});
