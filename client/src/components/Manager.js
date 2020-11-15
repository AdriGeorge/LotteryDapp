import React from 'react';

const Manager = ({ pickWinner }) => {
  return (
    <form onSubmit={(e) => pickWinner(e)}>
      <button className="btn">Get winner</button>
    </form>
  );
};

export default Manager;
