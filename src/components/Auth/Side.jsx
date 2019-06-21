import React from 'react';

export default function Title({ img }) {
  return (
    <div>
      <h1 className="tagline">
        <span>If you do not express your own original ideas</span>
        <span> You will have betrayed yourself</span>
      </h1>
      <div className="container">
        <img src={img} alt="" className="img-fluid" />
      </div>
    </div>
  );
}
