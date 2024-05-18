import React from 'react';
import TEST_ID from './ColourSelector.testid';
import propTypes from 'prop-types';

export const styles = {
  container:
    'w-full max-w-sm min-w-max border border-solid border-organizerGray-primary flex flex-col min-h-0',
  quickOptionsContainer:
    'w-full border-b border-b-organizerGray-primary flex-wrap',
  quickOptions: 'm-3 flex flex-col flex-wrap',
  optionButton:
    'mx-2 px-2 py-1 min-w-24 border-2 border-transparent hover:border-organizerGray-primary rounded-md cursor-pointer',
  optionButtonsRow: 'flex justify-between py-1 group flex-wrap',
  colourButton: {
    Red: 'bg-red-500 border-red-700 hover:bg-red-600 hover:border-red-600',
    Green:
      'bg-green-500 border-green-700 hover:bg-green-600 hover:border-green-600',
    Blue: 'bg-blue-500 border-blue-700 hover:bg-blue-600 hover:border-blue-600',
    Yellow:
      'bg-yellow-500 border-yellow-700 hover:bg-yellow-600 hover:border-yellow-600',
    Purple:
      'bg-purple-500 border-purple-700 hover:bg-purple-600 hover:border-purple-600',
    Orange:
      'bg-orange-500 border-orange-700 hover:bg-orange-600 hover:border-orange-600',
    Black:
      'bg-black border-black hover:bg-gray-700 hover:border-gray-700 text-white',
  },
};

const ColourSelector = ({ setColour }) => {
  const colours = [
    'Red',
    'Green',
    'Blue',
    'Yellow',
    'Purple',
    'Orange',
    'Black',
    'No Colour',
  ];

  return (
    <div data-testid={TEST_ID.container}>
      {colours.map((colour, index) => {
        if (index % 2 === 0) {
          return (
            <div className={styles.optionButtonsRow} key={index}>
              <button
                onClick={() => setColour(colour)}
                className={`${styles.optionButton} ${styles.colourButton[colour]}`}
                data-testid={TEST_ID[`button-${colour}`]}
              >
                {colour}
              </button>
              {colours[index + 1] && (
                <button
                  onClick={() => setColour(colours[index + 1])}
                  className={`${styles.optionButton} ${styles.colourButton[colours[index + 1]]}`}
                  data-testid={TEST_ID[`button-${colours[index + 1]}`]}
                >
                  {colours[index + 1]}
                </button>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ColourSelector;

ColourSelector.propTypes = {
  setColour: propTypes.func.isRequired,
};
