import React from 'react';
import { UserContext } from '../context/UserContext';
import LogOutButton from '../components/LogOutButtons/LogOutButton';

export default {
  title: 'Components/LogOutButton',
  component: LogOutButton,
};

const Template = (args) => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <LogOutButton {...args} />
  </UserContext.Provider>
);

export const Default = Template.bind({});
