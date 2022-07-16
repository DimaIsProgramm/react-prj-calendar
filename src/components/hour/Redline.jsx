import React, { useState, useEffect } from 'react';

const Redline = () => {
  const [redline, setRedline] = useState(new Date().getMinutes());

  useEffect(() => {
    const timerId = setInterval(() => {
      setRedline(redline => redline + 1);
    }, 60000);
    return () => clearInterval(timerId);
  });

  return <div className="red-line" style={{ top: redline + 'px' }}></div>;
};

export default Redline;
