import React from 'react';
import Component from '../Component';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Component.testid';

describe('Component', () => {
  it('renders the Component component', () => {
    render(
      <MemoryRouter>
        <Component toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const componentElement = screen.getByTestId(TEST_ID.element);
    expect(componentElement).toBeInTheDocument();
  });
});
