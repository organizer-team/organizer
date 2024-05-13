import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Home from '../pages/Home/Home';

export default {
  title: 'Pages/Home',
  component: Home,
};

const Template = (args) => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <Router>
      <Home {...args} />
    </Router>
  </UserContext.Provider>
);

export const Default = Template.bind({});
