import React from 'react';

const Manager = ({ pickWinner }) => {
  return (
    <form onSubmit={(e) => pickWinner(e)}>
      <h4>Click to get the winner!</h4>
      <button className="btn-winner">
        <span>EndGame</span>
      </button>
    </form>
  );
};

export default Manager;
