import React from 'react';
import ColourSelector from '../ColourSelector';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../ColourSelector.testid';

describe('ColourSelector', () => {
  it('renders the ColourSelector component', () => {
    render(
      <MemoryRouter>
        <ColourSelector />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const colourSelectorElement = screen.getByTestId(TEST_ID.element);
    expect(colourSelectorElement).toBeInTheDocument();
  });
});
