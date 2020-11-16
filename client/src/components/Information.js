import React from 'react';

const Information = ({ you, manager, lastWinner, players, balance }) => {
  return (
    <div className="contract-info">
      <div className="title">
        <h3>total prize: {balance} eth</h3>
        <h4>players in this round: {players}</h4>
      </div>
      <h4>You are connected as: {you}</h4>
      <h4>Owner of the game: {manager}</h4>
      <h4>Last winner: {lastWinner}</h4>
    </div>
  );
};

export default Information;
