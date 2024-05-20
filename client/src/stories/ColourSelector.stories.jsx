import React from 'react';
import ColourSelector from '../components/ColourSelector/ColourSelector';
import { MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ColourSelector',
  component: ColourSelector,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <ColourSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  colour: 'red',
  setColour: action('setColour'),
};

export const Blue = Template.bind({});
Blue.args = {
  colour: 'blue',
  setColour: action('setColour'),
};
