import React from 'react';
import ColourSelector from '../ColourSelector';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../ColourSelector.testid';

describe('ColourSelector', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ColourSelector setColour={jest.fn()} />
      </MemoryRouter>
    );
  });

  it('renders the ColourSelector component', () => {
    // Assert that the component is rendered
    const colourSelectorElement = screen.getByTestId(TEST_ID.container);
    expect(colourSelectorElement).toBeInTheDocument();
  });

  const colours = [
    'Red',
    'Green',
    'Blue',
    'Yellow',
    'Purple',
    'Orange',
    'Black',
    'No Colour',
  ];

  colours.forEach((colour) => {
    it(`renders the ${colour} button`, () => {
      const button = screen.getByTestId(TEST_ID[`button-${colour}`]);
      expect(button).toBeInTheDocument();
    });
  });
});
