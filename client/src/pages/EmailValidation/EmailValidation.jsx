import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const EmailValidation = () => {
  const [email, setEmail] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExistenceStatus, setEmailExistenceStatus] = useState({
    exists: 'unknown',
  });

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/user/checkemail/${email}`,
    response => {
      setEmailExistenceStatus({ exists: response.exists });
      setCheckingEmail(false);
    }
  );

  useEffect(() => {
    if (validateEmail(email)) {
      performFetch();
    }
    return cancelFetch;
  }, [email]);

  // email validation function

  return (
    <div className='flex flex-col justify-center items-center h-screen p-4 gap-y-8'>
      <p className='text-xl'>Let’s check what you are going to do today!</p>
      <input
        className='border-2 border-[#9747FF] p-2 rounded w-full'
        placeholder='Enter your email'
        type='email'
        value={email}
        onChange={e => {
          const email = e.target.value;
          setEmail(email);
          if (validateEmail(email)) {
            setCheckingEmail(true);
          } else {
            console.log('Invalid email');
          }
        }}
      />
      {checkingEmail && <div>Checking email...</div>}
      {emailExistenceStatus.exists === 'unknown' ? (
        <div>Not an email</div>
      ) : emailExistenceStatus.exists === true ? (
        <div>Login...</div>
      ) : (
        <div>Sign up</div>
      )}
    </div>
  );
};

export default EmailValidation;
