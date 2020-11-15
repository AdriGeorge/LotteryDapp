import React from 'react';

const Information = ({ manager, players, balance }) => {
  return (
    <div className="info">
      owner: {manager}, total winBalance: {balance}
      {players.map((player, index) => {
        return (
          <div className="player" key={index}>
            {player}
          </div>
        );
      })}
    </div>
  );
};

export default Information;
