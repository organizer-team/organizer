import React from 'react';
import { render } from '@testing-library/react';
import CredentialsInput from '../CredentialsInput';

describe('CredentialsInput', () => {
  it('renders with the correct props', () => {
    const { getByDisplayValue } = render(
      <CredentialsInput name="test" value="test value" onChange={() => {}} />
    );

    expect(getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('has the correct classes', () => {
    const { getByDisplayValue } = render(
      <CredentialsInput name="test" value="test value" onChange={() => {}} />
    );

    const input = getByDisplayValue('test value');

    expect(input).toHaveClass('border-2');
    expect(input).toHaveClass('border-solid');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('p-2');
    expect(input).toHaveClass('text-center');
    expect(input).toHaveClass('rounded');
  });
});
