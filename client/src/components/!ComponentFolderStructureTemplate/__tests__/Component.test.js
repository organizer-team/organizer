import React from 'react';
import Component from '../Component';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Component.testid';

describe('Component', () => {
  it('renders the Component component', () => {
    render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const componentContainer = screen.getByTestId(TEST_ID.container);
    expect(componentContainer).toBeInTheDocument();
  });
});
