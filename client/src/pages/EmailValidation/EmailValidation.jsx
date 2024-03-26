import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const EmailValidation = () => {
  const [email, setEmail] = useState('a');
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExistenceStatus, setEmailExistenceStatus] = useState({
    exists: 'unknown',
  });

  const { performFetch, cancelFetch } = useFetch(
    `/user/checkemail/${email}`,
    response => {
      setEmailExistenceStatus({ exists: response.exists });
      setCheckingEmail(false);
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  // email validation function
  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen p-4 gap-y-8'>
      <p className='text-xl'>Let’s check what you are going to do today!</p>
      <input
        className='border-2 border-[#9747FF] p-2 rounded w-full'
        placeholder='Enter your email'
        type='email'
        onChange={e => {
          const email = e.target.value;
          console.log(emailExistenceStatus);
          setEmail(email);
          if (validateEmail(email)) {
            setCheckingEmail(true);
            // after having a valid email, we can check if it exists in the database
            setTimeout(() => {
              performFetch();
            }, 1500);
          } else {
            console.log('Invalid email');
          }
        }}
      />
      {checkingEmail && <div>Checking email...</div>}
      {emailExistenceStatus.exists === true ? (
        <div>Login...</div>
      ) : (
        <div>Sign up</div>
      )}
    </div>
  );
};

export default EmailValidation;
