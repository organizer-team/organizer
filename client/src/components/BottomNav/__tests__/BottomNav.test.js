import React from 'react';
import BottomNav from '../BottomNav';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import TEST_ID from '../BottomNav.testid.js';
import TEST_ID_TASKS from '../../../pages/Tasks/Tasks.testid.js';
import TEST_ID_CALENDAR from '../../../pages/Calendar/Calendar.testid.js';

describe('BottomNav', () => {
  it('renders the BottomNav component', () => {
    render(
      <MemoryRouter>
        <BottomNav toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const bottomNav = screen.getByTestId(TEST_ID.container);
    expect(bottomNav).toBeInTheDocument();
  });

  it('toggles the popup menu when the add button is clicked', () => {
    render(
      <MemoryRouter>
        <BottomNav toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Assert that the popup menu is initially hidden
    let popupMenu = screen.queryByTestId(TEST_ID.popupMenu);
    expect(popupMenu).not.toBeInTheDocument();

    // Click the add button to toggle the popup menu
    const addButton = screen.getByTestId(TEST_ID.addButton);
    fireEvent.click(addButton);

    // Re-query for the popup menu
    popupMenu = screen.getByTestId(TEST_ID.popupMenu);

    // Assert that the popup menu is now visible
    expect(popupMenu).toBeInTheDocument();

    // Click the add button again to hide the popup menu
    fireEvent.click(addButton);

    // Re-query for the popup menu
    popupMenu = screen.queryByTestId(TEST_ID.popupMenu);

    // Assert that the popup menu is hidden again
    expect(popupMenu).not.toBeInTheDocument();
  });

  it('navigates to the tasks page when the calendar button is clicked on the calendar page', () => {
    render(
      <MemoryRouter initialEntries={['/calendar']}>
        <BottomNav toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Assert that the calendar button is rendered
    const taskButton = screen.getByTestId(TEST_ID.taskButton);
    expect(taskButton).toBeInTheDocument();

    // Click the calendar button to navigate to the tasks page
    fireEvent.click(taskButton);

    // Assert that the URL has changed to the tasks page
    waitFor(() =>
      expect(screen.getByTestId(TEST_ID_TASKS.container)).toBeInTheDocument()
    );
  });

  it('navigates to the calendar page when the tasks button is clicked on the tasks page', () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <BottomNav toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Assert that the calendar button is rendered
    const calendarButton = screen.getByTestId(TEST_ID.calendarButton);
    expect(calendarButton).toBeInTheDocument();

    // Click the calendar button to navigate to the tasks page
    fireEvent.click(calendarButton);

    // Assert that the URL has changed to the tasks page
    waitFor(() =>
      expect(screen.getByTestId(TEST_ID_CALENDAR.container)).toBeInTheDocument()
    );
  });

  it('closes the popup menu when the user clicks outside', async () => {
    render(
      <MemoryRouter>
        <BottomNav toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Click the add button to open the popup menu
    const addButton = screen.getByTestId(TEST_ID.addButton);
    fireEvent.click(addButton);

    // Assert that the popup menu is visible
    let popupMenu = screen.getByTestId(TEST_ID.popupMenu);
    expect(popupMenu).toBeInTheDocument();

    // Click outside the popup menu
    userEvent.click(document.body);

    // Wait for the popup menu to be removed from the document
    await waitFor(() => {
      popupMenu = screen.queryByTestId(TEST_ID.popupMenu);
      expect(popupMenu).not.toBeInTheDocument();
    });
  });
});
