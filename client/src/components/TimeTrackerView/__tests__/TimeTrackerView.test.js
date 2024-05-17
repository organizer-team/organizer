import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeTrackerView from '../TimeTrackerView';

// mock the onDayBoxClick function
const mockOnDayBoxClick = jest.fn();

describe('TimeTrackerView', () => {
  it('renders DateView correctly', () => {
    render(<TimeTrackerView onDayBoxClick={mockOnDayBoxClick} />);

    expect(screen.getByText(/may 2024/i)).toBeInTheDocument();
  });

  it('renders DaysView correctly', () => {
    render(<TimeTrackerView onDayBoxClick={mockOnDayBoxClick} />);

    // each day of the week is rendered correctly
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });
});
