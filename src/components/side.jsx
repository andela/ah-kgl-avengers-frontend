
import React from 'react';

export default function Title({ img }) {
  return (
    <div>
      <h1 className="tagline">
        <span>Either write something worth reading</span>
        <span> Or do something worth writing</span>
      </h1>
      <div className="container">
        <img
          src={img}
          alt=""
          className="img-fluid"
        />
      </div>
    </div>
  );
}
 