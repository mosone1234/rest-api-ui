import React from 'react';
import './Spinner.css';

import { useSelector } from 'react-redux';

const Spinner = () => {
  const loading = useSelector((state) => state.user.loading);
  return (
    <>
      {loading ? (
        <div className="loader-bg">
          <div className="circles-loader"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Spinner;
