import React, { useContext } from 'react';
import TEST_ID from './AreaSelector.testid';
import propTypes from 'prop-types';
import { UserContext } from '../../context/UserContext';

export const styles = {
  container:
    'w-full max-w-sm min-w-max border border-solid border-organizerGray-primary flex flex-col min-h-0',
  quickOptionsContainer:
    'w-full border-b border-b-organizerGray-primary flex-wrap',
  quickOptions: 'm-3 flex flex-col flex-wrap',
  optionButton:
    'mx-2 px-2 py-1 min-w-24 border-2 border-transparent hover:border-organizerGray-primary rounded-md cursor-pointer',
  optionButtonsRow: 'flex justify-between py-1 group flex-wrap',
};

const AreaSelector = ({ setArea }) => {
  const { userInfo } = useContext(UserContext);
  const userAreas = userInfo?.areas ? userInfo.areas : [];
  const areas = [...userAreas, 'Inbox'];

  return (
    <div data-testid={TEST_ID.container}>
      {areas?.map((area, index) => {
        if (index % 2 === 0) {
          return (
            <div className={styles.optionButtonsRow} key={index}>
              <button
                onClick={() => setArea(area)}
                className={styles.optionButton}
                data-testid={TEST_ID[`button-${area}`]}
              >
                {area}
              </button>
              {areas[index + 1] && (
                <button
                  onClick={() => setArea(areas[index + 1])}
                  className={styles.optionButton}
                  data-testid={TEST_ID[`button-${areas[index + 1]}`]}
                >
                  {areas[index + 1]}
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

AreaSelector.propTypes = {
  setArea: propTypes.func.isRequired,
};

export default AreaSelector;
