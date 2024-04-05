import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import TEST_ID from './EmailValidation.testid';
import { UserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';

// styles
const styles = {
  CONTAINER:
    'flex flex-col justify-center items-center h-screen p-4 gap-y-16 bg-[#F2F2F2]',
  INPUT:
    'text-center border-2 border-[#C996FF] p-2 rounded w-full max-w-md focus:outline-[#9747FF]',
  PARAGRAPH: 'text-lg text-center text-[#6E24B1] mb-4',
  CHECKING_EMAIL: 'text-[#9747FF] text-sm mt-2',
};

// component
const EmailValidation = () => {
  const navigate = useNavigate();
  const { setEmailAfterValidation } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Give some time to the user before redirecting to the login or sign up page
  let timeoutId;
  const handleTypingStop = () => {
    if (validateEmail(email)) {
      setCheckingEmail(true);
      timeoutId = setTimeout(() => {
        performFetch();
      }, 3000);
    }
  };
  const handleTyping = () => {
    clearTimeout(timeoutId);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/user/checkemail/${email}`,
    response => {
      setCheckingEmail(false);
      setEmailAfterValidation(email);
      response.exists
        ? navigate('/../user/login')
        : navigate('/../user/signup');
    }
  );

  useEffect(() => {
    handleTypingStop();
    handleTyping();

    if (validateEmail(email)) {
      handleTypingStop();
    }

    return () => {
      clearTimeout(timeoutId);
      cancelFetch();
    };
  }, [email]);

  return (
    <div data-testid={TEST_ID.container} className={styles.CONTAINER}>
      <p className={styles.PARAGRAPH}>
        Let’s check what you are going to do today!
      </p>
      <input
        className={styles.INPUT}
        data-testid={TEST_ID.emailInput}
        placeholder='Enter your email'
        type='email'
        value={email}
        onChange={e => {
          const email = e.target.value;
          setEmail(email);
        }}
        onKeyUp={handleTypingStop}
        onKeyDown={handleTyping}
      />
      {checkingEmail && (
        <div className={styles.CHECKING_EMAIL}>Checking email...</div>
      )}
    </div>
  );
};

export default EmailValidation;
