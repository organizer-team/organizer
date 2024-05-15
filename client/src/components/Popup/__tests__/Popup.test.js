import React from 'react';
import Popup from '../Popup';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Popup.testid';

describe('Popup', () => {
  it('renders the Component component', () => {
    render(
      <MemoryRouter>
        <Popup />
      </MemoryRouter>
    );

    // Assert that the Popup component is rendered
    const popupElement = screen.getByTestId(TEST_ID.element);
    expect(popupElement).toBeInTheDocument();
  });
});
