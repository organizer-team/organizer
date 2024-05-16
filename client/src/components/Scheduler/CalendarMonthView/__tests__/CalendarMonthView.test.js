import React from 'react';
import CalendarMonthView from '../CalendarMonthView';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../CalendarMonthView.testid';

describe('CalendarMonthView', () => {
  it('renders the CalendarMonthView component', () => {
    render(
      <MemoryRouter>
        <CalendarMonthView />
      </MemoryRouter>
    );

    // Assert that the CalendarMonthView component is rendered
    const calendarMonthViewElement = screen.getByTestId(TEST_ID.element);
    expect(calendarMonthViewElement).toBeInTheDocument();
  });
});
