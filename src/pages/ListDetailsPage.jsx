import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import ItemCard from "../components/ItemCard";
import AddItemForm from "../components/AddItemForm";
import "./ListDetailsPage.css";
import Snowflakes from "../components/Snowflakes";

function ListDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        setLoading(true);
        // Fetch list details
        const listResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/lists/${id}/`,
          {
            headers: {
              Authorization: `Token ${auth.token}`,
            },
          }
        );

        if (!listResponse.ok) {
          throw new Error("Failed to fetch list details");
        }

        const listData = await listResponse.json();
        setList(listData);

        // Fetch list items using the correct endpoint
        const itemsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/items/?list_id=${id}&archived=false`,
          {
            headers: {
              Authorization: `Token ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!itemsResponse.ok) {
          throw new Error("Failed to fetch list items");
        }

        const itemsData = await itemsResponse.json();
        setItems(itemsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth.token && id) {
      fetchListDetails();
    }
  }, [id, auth.token]);

  const handleAddItem = async (itemData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/items/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...itemData,
          list_id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();
      setItems((prevItems) => [...prevItems, newItem]);
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleFavorite = async (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${itemId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...item,
            favourite: !item.favourite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === itemId ? updatedItem : i))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTogglePurchased = async (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${itemId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...item,
            purchased: !item.purchased,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === itemId ? updatedItem : i))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${itemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${auth.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoBack = () => {
    navigate("/lists");
  };

  if (loading) {
    return <div className="list-details-loading">Loading...</div>;
  }

  if (error) {
    return <div className="list-details-error">Error: {error}</div>;
  }

  if (!list) {
    return <div className="list-details-not-found">List not found</div>;
  }

  return (
    <div className="list-details-container">
      {/* Snowflakes Component */}
      <Snowflakes />

      <div className="list-details-header">
        <Link to="/lists">← Back to Lists</Link>
        <div className="list-header-content">
          <h1>{list.list_name}</h1>
          <div className="list-info">
            {/* <p>Budget: ${list.individual_budget}</p> */}
            {list.notes && <p>{list.notes}</p>}
          </div>
        </div>
      </div>

      <div className="list-items-container">
        {items.length > 0 ? (
          <div className="items-grid">
            <div className="items-header-row">
              <div className="header-rank">Rank</div>
              <div className="header-item">Item</div>
              <div className="header-cost">Cost</div>
              <div className="header-favorite">♥</div>
              <div className="header-purchased">🎁</div>
              <div className="header-delete">x</div>
            </div>
            {items.map((item) => (
              <ItemCard
                key={item.id}
                itemId={item.id}
                listId={parseInt(id)}
                itemName={item.name}
                cost={item.cost}
                rank={item.ranking || items.length}
                isFavorite={item.favourite || false}
                isPurchased={item.purchased || false}
                isArchived={!!item.archived_at}
                store={item.store}
                link={item.link}
                comments={item.comments}
                onToggleFavorite={() => handleToggleFavorite(item.id)}
                onTogglePurchased={() => handleTogglePurchased(item.id)}
                onDelete={() => handleDeleteItem(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-items">
            <p>No items in this list yet</p>
          </div>
        )}

        {!showAddForm && (
          <button onClick={() => setShowAddForm(true)}>Add Item</button>
        )}

        {showAddForm && (
          <AddItemForm
            onSubmit={handleAddItem}
            onCancel={() => setShowAddForm(false)}
            currentRanking={items.length + 1}
          />
        )}
      </div>
    </div>
  );
}

export default ListDetailsPage;
