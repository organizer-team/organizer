import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateUser from './pages/User/CreateUser/CreateUser';
import UserList from './pages/User/UserList/UserList';
import AuthLayout from './layout/AuthLayout';
import LoginPage from './pages/User/LoginPage/LoginPage';
import EmailValidation from './pages/EmailValidation/EmailValidation';
import Tasks from './pages/Tasks/Tasks';
import Calendar from './pages/Calendar/Calendar';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/email-validation" element={<EmailValidation />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route path="/user" element={<AuthLayout />}>
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/signup" element={<CreateUser />} />
          <Route path="/user/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
