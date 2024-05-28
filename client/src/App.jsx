import './App.css';
import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateUser from './pages/User/CreateUser/CreateUser';
import UserList from './pages/User/UserList/UserList';
import AuthLayout from './layout/AuthLayout';
import LoginPage from './pages/User/LoginPage/LoginPage';
import EmailValidation from './pages/EmailValidation/EmailValidation';
import Tasks from './pages/Tasks/Tasks.tsx';
import Calendar from './pages/Calendar/Calendar';
import MainLayout from './layout/MainLayout';
import { UserContext } from './context/UserContext';
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  const { token, emailAfterValidation } = useContext(UserContext);
  return (
    <Routes>
      <Route
        path="/welcome"
        element={!token ? <WelcomePage /> : <Navigate to={'/'} />}
      />
      <Route
        path="/email-validation"
        element={!token ? <EmailValidation /> : <Navigate to={'/'} />}
      />
      <Route
        path="/"
        element={token ? <MainLayout /> : <Navigate to={'/welcome'} />}
      >
        <Route index element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
      </Route>
      <Route path="/user" element={token ? <Outlet /> : <AuthLayout />}>
        <Route
          path="/user/list"
          element={token ? <UserList /> : <Navigate to={'/user/login'} />}
        />
        <Route
          path="/user/signup"
          element={
            emailAfterValidation ? (
              <CreateUser emailAfterValidation={emailAfterValidation} />
            ) : (
              <Navigate to={'/email-validation'} />
            )
          }
        />
        <Route
          path="/user/login"
          element={
            emailAfterValidation ? (
              <LoginPage emailAfterValidation={emailAfterValidation} />
            ) : (
              <Navigate to={'/email-validation'} />
            )
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
