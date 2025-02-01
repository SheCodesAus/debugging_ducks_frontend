import { useState } from "react";
import PropTypes from 'prop-types';
import postCategory from "../api/post-category";

function CreateCategoryForm({ onCategoryCreated }) {
    const [formData, setFormData] = useState({
        category_name: "",
        category_budget: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: name === 'category_budget' ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const categoryData = {
                ...formData,
            };
            
            const newCategory = await postCategory(categoryData);
            onCategoryCreated(newCategory);
        } catch (err) {
            console.error("Error creating category:", err);
            setErrors({ submit: "Failed to create category. Please try again." });
        }
    };

    return (
      <div className="list-form-page">
        <div className="list-form-container">
          <h2 className="list-form-heading">
            <span className="icon">꧁</span> Create New Category{" "}
            <span className="icon flip-icon">꧁</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="category_name">Category Name:</label>
              <input
                type="text"
                id="category_name"
                name="category_name"
                value={formData.category_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category_budget">Category Budget ($):</label>
              <input
                type="number"
                id="category_budget"
                name="category_budget"
                value={formData.category_budget}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            {errors.submit && <p className="error">{errors.submit}</p>}

            <button type="submit">Create Category</button>
          </form>
        </div>
      </div>
    );
}

CreateCategoryForm.propTypes = {
    onCategoryCreated: PropTypes.func.isRequired
};

export default CreateCategoryForm; 