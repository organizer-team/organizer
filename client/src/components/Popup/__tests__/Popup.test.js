import React, { act } from 'react';
import Popup from '../Popup';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Popup.testid';

describe('Popup', () => {
  it('renders the Popup component', () => {
    render(
      <MemoryRouter>
        <Popup isOpen={true} onClose={() => {}}>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the Popup component is rendered
    const popupElement = screen.getByTestId(TEST_ID.content);
    expect(popupElement).toBeInTheDocument();
    expect(popupElement).toHaveTextContent('Test content');
  });

  it('closes the Popup when clicking outside', () => {
    let isOpen = true;
    const onClose = jest.fn(() => {
      isOpen = false;
    });

    let { rerender } = render(
      <MemoryRouter>
        <Popup isOpen={isOpen} onClose={onClose}>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the Popup is initially open
    let popupContent = screen.getByTestId(TEST_ID.content);
    expect(popupContent).toBeInTheDocument();

    // Simulate a click outside the Popup
    act(() => {
      fireEvent.click(screen.getByTestId(TEST_ID.overlay));
    });

    // Assert that onClose has been called
    expect(onClose).toHaveBeenCalled();

    // Rerender the Popup with the new isOpen value
    rerender(
      <MemoryRouter>
        <Popup isOpen={isOpen} onClose={onClose}>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the Popup is now closed
    popupContent = screen.queryByTestId(TEST_ID.content);
    expect(popupContent).not.toBeInTheDocument();
  });

  it('darkens the environment when the darken prop is true', () => {
    render(
      <MemoryRouter>
        <Popup isOpen={true} onClose={() => {}} darken={true}>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the overlay has the appropriate class
    const overlayElement = screen.getByTestId(TEST_ID.overlay);
    expect(overlayElement).toHaveClass('bg-black bg-opacity-50');
  });

  it('does not darken the environment when the darken prop is false', () => {
    render(
      <MemoryRouter>
        <Popup isOpen={true} onClose={() => {}} darken={false}>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the overlay has the appropriate class
    const overlayElement = screen.getByTestId(TEST_ID.overlay);
    expect(overlayElement).toHaveClass('bg-transparent');
  });
});
