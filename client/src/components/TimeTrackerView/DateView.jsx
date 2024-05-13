import React from 'react';

const DateView = () => {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className="mr-auto pl-20 text-base">
      <h2>{formattedDate}</h2>
    </div>
  );
};

export default DateView;
