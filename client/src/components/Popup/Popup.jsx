import React from 'react';
import PropTypes from 'prop-types';
import TEST_ID from './Popup.testid';

const styles = {
  overlay: (darken) =>
    `fixed inset-0 flex items-center justify-center z-50 ${
      darken ? 'bg-black bg-opacity-50' : 'bg-transparent'
    }`,
  popup:
    'bg-white p-5 rounded-lg max-w-4/5 max-h-4/5 overflow-auto border border-organizerGray shadow-md',
};

const Popup = ({ children, darken = true, isOpen, onClose }) => {
  const handleClose = (e) => {
    if (e.target.id === 'overlay') {
      onClose();
    }
  };

  return isOpen ? (
    <div
      id="overlay"
      onClick={handleClose}
      className={styles.overlay(darken)}
      data-testid={TEST_ID.overlay}
    >
      <div data-testid={TEST_ID.content} className={styles.popup}>
        {children}
      </div>
    </div>
  ) : null;
};

export default Popup;

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  darken: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
