// BottomNav.stories.js
import React from 'react';
import { action } from '@storybook/addon-actions';
import BottomNav from '../components/BottomNav/BottomNav';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/BottomNav',
  component: BottomNav,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <BottomNav {...args} />;

export const Default = Template.bind({});
Default.args = {
  toggleLeftSideMenu: action('toggleLeftSideMenu'),
};
