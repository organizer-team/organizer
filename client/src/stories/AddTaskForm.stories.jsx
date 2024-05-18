import React, { useState } from 'react';
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
  argTypes: {
    onClose: { action: 'closed' },
  },
};

const Template = () => {
  const [isOpen, setIsOpen] = useState(true);
  return isOpen ? <AddTaskForm onClose={() => setIsOpen(false)} /> : null;
};

export const Default = Template.bind({});
Default.args = {};
