import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoginPage from '../pages/User/LoginPage/LoginPage';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  argTypes: {
    emailAfterValidation: { control: 'text' },
  },
};

const Template = (args) => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <Router>
      <LoginPage {...args} />
    </Router>
  </UserContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  emailAfterValidation: 'sample@example.com',
};
