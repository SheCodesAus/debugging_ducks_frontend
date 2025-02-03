import PropTypes from "prop-types";
import { useState } from "react";
import ItemCard from "./ItemCard";
import AddItemForm from "./AddItemForm";
import useItems from "../hooks/use-items";
import SleighLoading from "./SleighLoading";

function ListItem({ list }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const {
    items,
    isLoading,
    error,
    addItem,
    toggleFavorite,
    togglePurchased,
    toggleArchived,
  } = useItems(list.id);

  const handleToggleFavorite = async (itemId) => {
    try {
      await toggleFavorite(itemId);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert("Failed to update favorite status. Please try again.");
    }
  };

  const handleTogglePurchased = async (itemId) => {
    try {
      await togglePurchased(itemId);
    } catch (err) {
      console.error("Error toggling purchased:", err);
      alert("Failed to update purchased status. Please try again.");
    }
  };

  const handleToggleArchived = async (itemId) => {
    try {
      await toggleArchived(itemId);
    } catch (err) {
      console.error("Error archiving item:", err);
      if (err.message === "User must be logged in to archive items") {
        alert("You must be logged in to archive items.");
      } else {
        alert("Failed to archive item. Please try again.");
      }
    }
  };

  const handleAddItem = async (formData) => {
    try {
      await addItem(formData);
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item. Please try again.");
    }
  };

  if (isLoading) return <SleighLoading />;
  if (error) return <div>Error loading items: {error.message}</div>;

  return (
    <div className="list-item">
      <div className="list-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>{list.list_name}</h4>
        <p>Budget: ${list.individual_budget}</p>
        {list.notes && <p className="list-notes">{list.notes}</p>}
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
          {isExpanded ? "▼" : "▶"}
        </span>
      </div>

      {isExpanded && (
        <div className="items-container">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              itemName={item.name}
              cost={item.cost}
              rank={item.ranking}
              isFavorite={item.favourite}
              isPurchased={item.purchased}
              isArchived={!!item.archived_at}
              store={item.store}
              link={item.link}
              comments={item.comments}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
              onTogglePurchased={() => handleTogglePurchased(item.id)}
              onDelete={() => handleToggleArchived(item.id)}
            />
          ))}

          {showAddForm ? (
            <AddItemForm
              onSubmit={handleAddItem}
              onCancel={() => setShowAddForm(false)}
              currentRanking={items.length + 1}
            />
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="add-item-button"
            >
              Add Item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListItem;
