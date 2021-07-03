import React from 'react';
import loading from './loading2.gif';

// import './LoadingSpinner.css';

const Loading = props => {
  return (
      <div className="absolute-center loading-spinner__overlay">
      	<img src={loading} alt="loading..." />      
      </div>
  );
};

export default Loading;
