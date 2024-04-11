import React from 'react';

import classNames from '../../utils/classNames';

/* Styles */
const styles = {
  INPUT_1:
    'w-full p-2 rounded max-w-md text-center text-organizerPurple-primary',
  INPUT_2:
    'border-2 border-solid border-purple-600 focus:border-organizerPurple-primary outline-none',
};

const CredentialsInput = ({ ...rest }) => {
  return (
    <input {...rest} className={classNames(styles.INPUT_1, styles.INPUT_2)} />
  );
};

export default CredentialsInput;
