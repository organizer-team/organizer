import React from 'react';
import Popup from '../Popup';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Popup.testid';

describe('Popup', () => {
  it('renders the Popup component', () => {
    render(
      <MemoryRouter>
        <Popup>
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
    render(
      <MemoryRouter>
        <Popup>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the Popup is initially open
    let popupElement = screen.getByTestId(TEST_ID.content);
    expect(popupElement).toBeInTheDocument();

    // Simulate a click outside the Popup
    fireEvent.click(screen.getByTestId(TEST_ID.overlay));

    // Assert that the Popup is closed
    popupElement = screen.queryByTestId(TEST_ID.content);
    expect(popupElement).not.toBeInTheDocument();
  });

  it('darkens the environment when the darken prop is true', () => {
    render(
      <MemoryRouter>
        <Popup darken={true}>
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
        <Popup darken={false}>
          <div>Test content</div>
        </Popup>
      </MemoryRouter>
    );

    // Assert that the overlay has the appropriate class
    const overlayElement = screen.getByTestId(TEST_ID.overlay);
    expect(overlayElement).toHaveClass('bg-transparent');
  });
});
