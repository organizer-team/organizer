import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

export default {
  title: 'Pages/WelcomePage',
  component: WelcomePage,
};

const Template = (args) => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <Router>
      <WelcomePage {...args} />
    </Router>
  </UserContext.Provider>
);

export const Default = Template.bind({});
