import React, { useState } from "react";
import "./ItemCard.css";

function ItemCard({ memberName, itemName, cost, rank, isFavorite, onToggleFavorite }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFavoriteToggle = () => {
    onToggleFavorite && onToggleFavorite(itemName); 
  };

  return (
    <div className="item-component">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="item-checkbox"
      />
      <p className="item-member">{memberName}</p>
      <p className="item-name">{itemName}</p>
      <p className="item-cost">${cost.toFixed(2)}</p>
      <p className="item-rank">Rank: {rank}</p>
      <button
        className={`item-favorite ${isFavorite ? "favorite" : ""}`}
        onClick={handleFavoriteToggle}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default ItemCard;
