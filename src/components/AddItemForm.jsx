import { useState } from "react";
import PropTypes from "prop-types";
import "./AddItemForm.css";

function AddItemForm({ onSubmit, onCancel, currentRanking }) {
  const [formData, setFormData] = useState({
    name: "",
    store: "",
    link: "",
    ranking: currentRanking,
    cost: "",
    comments: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      // If the form field's name is 'cost' or 'ranking', parse the form field's value as an integer
      [name]:
        name === "cost" || name === "ranking"
          ? value === ""
            ? ""
            : parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container add-item-form">
      <a onClick={onCancel} className="cancel-x">
        X
      </a>
      <h2>New Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="store">Store</label>
        <input
          type="text"
          id="store"
          name="store"
          value={formData.store}
          onChange={handleChange}
        />

        <label htmlFor="link">Product URL</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://..."
        />

        <label htmlFor="ranking">Rank*</label>
        <input
          type="number"
          id="ranking"
          name="ranking"
          value={formData.ranking}
          onChange={handleChange}
          min="1"
          required
        />

        <label htmlFor="cost">Cost ($)</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          min="0"
          step="1"
        />

        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          maxLength="255"
          rows="3"
        />

        <div className="form-buttons">
          <button type="submit">Add</button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

AddItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  currentRanking: PropTypes.number.isRequired,
};

export default AddItemForm;
