import { useState } from "react";
import postCategory from "../api/post-category.js"; 
import PropTypes from 'prop-types';

function AddCategoryForm({ onCategoryCreated }) {

    const [categoryData, setCategoryData] = useState({
        name: "",
        budget: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoryData({
            ...categoryData,
            [name]: name === 'budget' ? parseFloat(value) || '' : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newCategory = await postCategory(categoryData);
            onCategoryCreated(newCategory);
        } catch (err) {
            console.error("Error creating category:", err);
            setErrors({ submit: "Failed to create category. Please try again." });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
                <label htmlFor="name">Category Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={categoryData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="budget">Budget ($):</label>
                <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={categoryData.budget}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                />
            </div>

            {errors.submit && <p className="error">{errors.submit}</p>}
            
            <button type="submit">Create Category</button>
        </form>
    );
}

AddCategoryForm.propTypes = {
    onCategoryCreated: PropTypes.func.isRequired
};

export default AddCategoryForm;