import React from 'react';
import './Ball.css';

const Ball = ({ position }) => {
  return (
    <div
      className="ball"
      style={{
        left: position.x,
        top: position.y,
      }}
    ></div>
  );
};

export default Ball;