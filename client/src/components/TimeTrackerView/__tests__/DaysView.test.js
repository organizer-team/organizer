import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DaysView from '../DaysView';

describe('DaysView Component', () => {
  const mockOnClick = jest.fn();

  test('renders correctly with default props', () => {
    const { getByText } = render(<DaysView onDayBoxClick={mockOnClick} />);

    expect(getByText(/Mon/i)).toBeInTheDocument();
    expect(getByText(/Tue/i)).toBeInTheDocument();
    expect(getByText(/Wed/i)).toBeInTheDocument();
    expect(getByText(/Thu/i)).toBeInTheDocument();
    expect(getByText(/Fri/i)).toBeInTheDocument();
    expect(getByText(/Sat/i)).toBeInTheDocument();
    expect(getByText(/Sun/i)).toBeInTheDocument();
  });

  test('calls onDayBoxClick with correct parameters when a day box is clicked', () => {
    const { getByText } = render(<DaysView onDayBoxClick={mockOnClick} />);

    const mondayBox = getByText(/Mon/i);
    fireEvent.click(mondayBox);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );
  });
});
