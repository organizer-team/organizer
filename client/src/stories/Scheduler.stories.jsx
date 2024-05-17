import React from 'react';
import Scheduler from '../components/Scheduler/Scheduler';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Scheduler',
  component: Scheduler,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <Scheduler {...args} />;

export const Default = Template.bind({});
