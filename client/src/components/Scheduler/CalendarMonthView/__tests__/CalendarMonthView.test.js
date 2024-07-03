import React from 'react';
import CalendarMonthView from '../CalendarMonthView';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../CalendarMonthView.testid';

describe('CalendarMonthView', () => {
  const mockDate = new Date();
  mockDate.setDate(15);
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <CalendarMonthView selectedDate={mockDate} onSelect={mockOnSelect} />
      </MemoryRouter>
    );
  });

  it('renders the CalendarMonthView component', () => {
    const calendarMonthViewContainer = screen.getByTestId(TEST_ID.container);
    expect(calendarMonthViewContainer).toBeInTheDocument();
  });

  it('calls onSelect when a date is clicked', () => {
    const dateElement = screen.getByText(mockDate.getDate().toString());
    fireEvent.click(dateElement);
    expect(mockOnSelect).toHaveBeenCalled();
  });

  it('displays the correct month', () => {
    const monthName = mockDate.toLocaleString('default', { month: 'long' });
    const monthElements = screen.queryAllByText(new RegExp(monthName, 'i'));
    expect(monthElements.length).toBeGreaterThan(0);
  });

  it('changes the month when the previous button is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <CalendarMonthView selectedDate={mockDate} onSelect={mockOnSelect} />
      </MemoryRouter>
    );

    const prevButton = container.querySelector(
      '.react-calendar__navigation__prev-button'
    );
    fireEvent.click(prevButton);

    const previousMonthName = new Date(
      mockDate.getFullYear(),
      mockDate.getMonth() - 1
    ).toLocaleString('default', { month: 'long' });

    const monthElements = screen.queryAllByText(
      new RegExp(previousMonthName, 'i')
    );
    expect(monthElements.length).toBeGreaterThan(0);
  });
});
