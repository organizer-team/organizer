import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import EmailValidation from '../pages/EmailValidation/EmailValidation';

export default {
  title: 'Pages/EmailValidation',
  component: EmailValidation,
};

const Template = (args) => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <Router>
      <EmailValidation {...args} />
    </Router>
  </UserContext.Provider>
);

export const Default = Template.bind({});
