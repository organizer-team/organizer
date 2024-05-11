import React from 'react';
import CredentialsInput from '../components/CredentialsInput/CredentialsInput';

export default {
  title: 'Components/CredentialsInput',
  component: CredentialsInput,
};

const Template = (args) => <CredentialsInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter text',
};
