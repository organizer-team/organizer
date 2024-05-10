import React from 'react';

const DateView = () => {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className="date-view">
      <h2>{formattedDate}</h2>
    </div>
  );
};

export default DateView;
