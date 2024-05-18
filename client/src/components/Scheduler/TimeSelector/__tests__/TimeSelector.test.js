// TimeSelector.test.js
import React from 'react';
import TimeSelector from '../TimeSelector';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../TimeSelector.testid';

describe('TimeSelector', () => {
  it('renders the TimeSelector component', () => {
    const setSelectedTime = jest.fn(); // Create a mock function
    const selectedTime = new Date(); // Create a Date object
    render(
      <MemoryRouter>
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const timeSelectorContainer = screen.getByTestId(TEST_ID.container);
    expect(timeSelectorContainer).toBeInTheDocument();
  });

  it('renders the quick options', () => {
    const setSelectedTime = jest.fn(); // Create a mock function
    const selectedTime = new Date(); // Create a Date object
    render(
      <MemoryRouter>
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </MemoryRouter>
    );

    // Assert that the quick options are rendered
    const nowButton = screen.getByTestId(TEST_ID.nowButton);
    expect(nowButton).toBeInTheDocument();
  });

  it('changes the time when a quick option is selected', () => {
    const setSelectedTime = jest.fn(); // Create a mock function
    const selectedTime = new Date(); // Create a Date object
    render(
      <MemoryRouter>
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </MemoryRouter>
    );

    const quickOptions = [
      { option: 'Now', getTime: () => new Date(), TEST_ID: TEST_ID.nowButton },
      {
        option: 'Morning',
        getTime: () => {
          const time = new Date();
          time.setHours(9, 0, 0);
          return time;
        },
        TEST_ID: TEST_ID.morningButton,
      },
      {
        option: 'Afternoon',
        getTime: () => {
          const time = new Date();
          time.setHours(12, 0, 0);
          return time;
        },
        TEST_ID: TEST_ID.afternoonButton,
      },
      {
        option: 'Evening',
        getTime: () => {
          const time = new Date();
          time.setHours(18, 0, 0);
          return time;
        },
        TEST_ID: TEST_ID.eveningButton,
      },
      {
        option: 'Night',
        getTime: () => {
          const time = new Date();
          time.setHours(21, 0, 0);
          return time;
        },
        TEST_ID: TEST_ID.nightButton,
      },
      { option: 'No time', getTime: () => null, TEST_ID: TEST_ID.noTimeButton },
    ];

    const optionToTestId = {
      Now: TEST_ID.nowButton,
      Morning: TEST_ID.morningButton,
      Afternoon: TEST_ID.afternoonButton,
      Evening: TEST_ID.eveningButton,
      Night: TEST_ID.nightButton,
      'No time': TEST_ID.noTimeButton,
    };

    quickOptions.forEach(({ option, getTime }) => {
      const expectedTime = getTime();
      const optionButton = screen.getByTestId(optionToTestId[option]);
      fireEvent.click(optionButton);

      if (expectedTime) {
        expectedTime.setSeconds(0, 0); // Set the seconds and milliseconds to zero
        const receivedTime = new Date(setSelectedTime.mock.calls[0][0]);
        receivedTime.setSeconds(0, 0); // Set the seconds and milliseconds to zero
        expect(receivedTime).toEqual(expectedTime);
      } else {
        expect(setSelectedTime.mock.calls[0][0]).toBeNull();
      }

      setSelectedTime.mockClear(); // Clear the mock function's calls for the next iteration
    });
  });

  it('changes the time when a new time is entered', () => {
    const setSelectedTime = jest.fn();
    const selectedTime = new Date(); // Create a Date object
    render(
      <MemoryRouter>
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </MemoryRouter>
    );

    // Simulate changing the time input field
    const timeInput = screen.getByTestId(TEST_ID.timeInput);
    fireEvent.change(timeInput, { target: { value: '12:00' } });

    // Assert that setSelectedTime was called with a Date object
    expect(setSelectedTime).toHaveBeenCalledWith(expect.any(Date));
  });
});
