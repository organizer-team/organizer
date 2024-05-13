import React from 'react';
import LogOutButtonGuest from '../components/LogOutButtons/LogOutButtonGuest';

export default {
  title: 'Components/LogOutButtonGuest',
  component: LogOutButtonGuest,
};

const Template = (args) => <LogOutButtonGuest {...args} />;

export const Default = Template.bind({});
Default.args = {
  userId: '123',
};
