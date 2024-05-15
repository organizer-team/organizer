import React from 'react';
import AddTaskForm from '../components/AddTaskForm/AddTaskForm';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/AddTaskForm',
  component: AddTaskForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <AddTaskForm {...args} />;

export const Default = Template.bind({});
