import React, { useState } from 'react';

const Play = ({ enter }) => {
  const [entryPrice, setEntryPrice] = useState(0.1);
  return (
    <form className="play-form" onSubmit={(e) => enter(e, entryPrice)}>
      <label htmlFor="amount">Entry price:</label>
      <input
        type="number"
        step="0.1"
        min="0.1"
        id="amount"
        name="amount"
        value={entryPrice}
        onChange={(e) => setEntryPrice(e.target.value)}
      ></input>
      <button className="btn">Play</button>
    </form>
  );
};

export default Play;
