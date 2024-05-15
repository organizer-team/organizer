import React from 'react';
import Component from '../components/!ComponentFolderStructureTemplate/Component';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Component',
  component: Component,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <Component {...args} />;

export const Default = Template.bind({});
