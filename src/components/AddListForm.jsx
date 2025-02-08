import { useState } from "react";
import PropTypes from "prop-types";
import postList from "../api/post-list";

function AddListForm({ categoryId, categoryName, onListCreated }) {
  const [formData, setFormData] = useState({
    list_name: "",
    notes: "",
    individual_budget: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "individual_budget" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const listData = {
        ...formData,
        category_id: categoryId,
      };

      const newList = await postList(listData);
      onListCreated(newList);
    } catch (err) {
      console.error("Error creating list:", err);
      setErrors({ submit: "Failed to create list. Please try again." });
    }
  };

  return (
    <div className="list-form-container">
      <h1>
        <span className="header-flourish">꧁</span>
        New List for {categoryName}
        <span className="header-flourish flip-flourish">꧁</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="list_name">List Name:</label>
          <input
            type="text"
            id="list_name"
            name="list_name"
            value={formData.list_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group">
              <label htmlFor="individual_budget">Individual Budget ($):</label>
              <input
                type="number"
                id="individual_budget"
                name="individual_budget"
                value={formData.individual_budget}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div> */}

        {errors.submit && <p className="error">{errors.submit}</p>}

        <button type="submit">Create List</button>
      </form>
    </div>
  );
}

AddListForm.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  onListCreated: PropTypes.func.isRequired,
};

export default AddListForm;
