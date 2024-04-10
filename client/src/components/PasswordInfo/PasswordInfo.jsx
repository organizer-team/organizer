import React from 'react';

const styles = {
  CONTAINER: 'text-green-500 text-sm',
};
const PasswordInfo = () => {
  return (
    <div className={styles.CONTAINER}>
      <p>The password must be at least 8 characters long.</p>
      <p>
        It should contain a combination of uppercase letters, lowercase letters,
        numbers, and special characters.
      </p>
    </div>
  );
};

export default PasswordInfo;
