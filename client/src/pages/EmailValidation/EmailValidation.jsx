import React, { useState } from 'react';

const EmailValidation = () => {
  const [checkingEmail, setCheckingEmail] = useState(false);

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
          if (validateEmail(email)) {
            setCheckingEmail(true);
            console.log('Valid email');
          } else {
            console.log('Invalid email');
          }
        }}
      />
      {checkingEmail && <div>Checking email...</div>}
    </div>
  );
};

export default EmailValidation;
