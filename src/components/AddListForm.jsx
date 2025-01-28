import { useState } from "react";
import PropTypes from 'prop-types';
import postList from "../api/post-list";
import postCategory from "../api/post-category";

function AddListForm({ onListCreated }) {
    const [formData, setFormData] = useState({
        category_name: "",
        category_budget: 0,
        list_name: "",
        notes: "",
        individual_budget: 0,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: (name === 'category_budget' || name === 'individual_budget') 
                ? parseFloat(value) || 0 
                : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // First create the category
            const categoryData = {
                category_name: formData.category_name,
                category_budget: formData.category_budget
            };
            const newCategory = await postCategory(categoryData);
            
            // Then create the list with the new category ID
            const listData = {
                list_name: formData.list_name,
                notes: formData.notes,
                category_id: newCategory.id,
                individual_budget: formData.individual_budget
            };
            
            const newList = await postList(listData);
            onListCreated(newList);
        } catch (err) {
            console.error("Error creating list:", err);
            setErrors({ submit: "Failed to create list. Please try again." });
        }
    };

    return (
        <div className="list-form-page">
            <div className="list-form-container">
                <h2 className="list-form-heading">
                    <span className="icon">🎄</span>
                    Create New List
                    <span className="icon flip-icon">🎄</span>
                </h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Category Section */}
                    <div className="form-section">
                        <h3>Category Details</h3>
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
                    </div>

                    {/* List Section */}
                    <div className="form-section">
                        <h3>List Details</h3>
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
                        <div className="form-group">
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
                        </div>
                    </div>

                    {errors.submit && <p className="error">{errors.submit}</p>}
                    
                    <button type="submit">Create List</button>
                </form>
            </div>
        </div>
    );
}

AddListForm.propTypes = {
    onListCreated: PropTypes.func.isRequired
};

export default AddListForm;