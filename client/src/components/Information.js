import React from 'react';

const Information = ({ you, manager, players, balance }) => {
  return (
    <div className="contract-info">
      <h4>You are connected as: {you}</h4>
      <h4>Owner of the game: {manager}</h4>
      <h3>total prize: {balance} eth</h3>
      <h4>players in game: {players}</h4>
    </div>
  );
};

export default Information;
