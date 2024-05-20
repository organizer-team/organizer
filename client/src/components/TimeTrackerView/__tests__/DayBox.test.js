import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DayBox from '../DayBox';

describe('DayBox Component', () => {
  const mockDate = 17;
  const mockName = 'Monday';
  const mockOnClick = jest.fn();
  const mockIsSelected = false;

  test('renders correctly with provided props', () => {
    const { getByText } = render(
      <DayBox
        name={mockName}
        date={mockDate}
        isSelected={mockIsSelected}
        onDayBoxClick={mockOnClick}
      />
    );

    expect(getByText('Mon')).toBeInTheDocument();
    expect(getByText(mockDate.toString())).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const { container } = render(
      <DayBox
        name={mockName}
        date={mockDate}
        isSelected={mockIsSelected}
        onDayBoxClick={mockOnClick}
      />
    );

    fireEvent.click(container.firstChild);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockDate);
  });
});
