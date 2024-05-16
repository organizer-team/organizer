import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoginPage from '../pages/User/LoginPage/LoginPage';
import Popup from '../components/Popup/Popup';
import LogOutButton from '../components/LogOutButtons/LogOutButton';

export default {
  title: 'Components/Popup',
  component: Popup,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return <Popup {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export const Default = Template.bind({});
Default.args = {
  children: <div>Popup content</div>,
};

export const WithLogOutButton = Template.bind({});
WithLogOutButton.args = {
  children: <LogOutButton />,
};

export const TransparentOverlay = Template.bind({});
TransparentOverlay.args = {
  children: <LogOutButton />,
  darken: false,
};

export const LoginPageInPopup = () => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <Popup isOpen={true} onClose={() => {}}>
      <LoginPage emailAfterValidation="sample@example.com" />
    </Popup>
  </UserContext.Provider>
);

export const LoginPageWithPopup = () => (
  <UserContext.Provider value={{ setToken: () => {} }}>
    <LoginPage emailAfterValidation="sample@example.com" />
    <Popup isOpen={true} onClose={() => {}}>
      <div>Popup content</div>
    </Popup>
  </UserContext.Provider>
);
