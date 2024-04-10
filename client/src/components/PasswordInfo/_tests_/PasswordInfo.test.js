import React from 'react';
import { render } from '@testing-library/react';
import PasswordInfo from '../PasswordInfo';

describe('PasswordInfo', () => {
  it('should render the PasswordInfo component', () => {
    const { getByText } = render(<PasswordInfo />);
    const passwordInfo = getByText(
      'The password must be at least 8 characters long.'
    );
    expect(passwordInfo).toBeInTheDocument();
  });
});
