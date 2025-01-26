import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../components/itemcard";
import "./ListPage.css";

function ListPage() {
  const { listId } = useParams(); // Get list ID from the URL
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      memberName: "NEW", 
      itemName: "New Item",
      cost: 0.0,
      rank: items.length + 1,
      isFavorite: false,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div className="list-page">
      <h1>{listName}</h1>
      <p>List ID: {listId}</p>

      <div className="list-actions">
        <button onClick={handleAddItem}>Add Item</button>
        <button className="share-btn">Share List</button>
      </div>

      {/* Display Items */}
      {items.length > 0 ? (
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item-row">
              <ItemCard
                memberName={item.memberName}
                itemName={item.itemName}
                cost={item.cost}
                rank={item.rank}
                isFavorite={item.isFavorite}
              />
              <button
                className="delete-item-btn"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete Item
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in this list. Add one!</p>
      )}
    </div>
  );
}

export default ListPage;
