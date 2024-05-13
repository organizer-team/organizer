import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CreateUser from '../pages/User/CreateUser/CreateUser';

export default {
  title: 'Pages/CreateUser',
  component: CreateUser,
  argTypes: {
    emailAfterValidation: { control: 'text' },
  },
};

const Template = (args) => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <Router>
      <CreateUser {...args} />
    </Router>
  </UserContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  emailAfterValidation: 'sample@example.com',
};
