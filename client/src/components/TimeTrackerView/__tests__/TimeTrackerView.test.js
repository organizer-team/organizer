import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeTrackerView from '../TimeTrackerView';

// mock the onDayBoxClick function
const mockOnDayBoxClick = jest.fn();

describe('TimeTrackerView', () => {
  // Define an array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the current month and year
  const date = new Date();
  const currentMonthName = monthNames[date.getMonth()];
  const currentYear = date.getFullYear();

  // Format the expected string (adjust this based on how your component displays the date)
  const expectedMonthYearString = `${currentMonthName} ${currentYear}`;

  it('renders DateView correctly', () => {
    render(<TimeTrackerView onDayBoxClick={mockOnDayBoxClick} />);

    expect(screen.getByText(expectedMonthYearString)).toBeInTheDocument();
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
