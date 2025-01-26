import { useState } from "react";
import PropTypes from 'prop-types';
import postList from "../api/post-list";

function AddListForm({ categoryId, onListCreated }) {
    const [listData, setListData] = useState({
        list_name: "",
        notes: "",
        category_id: categoryId,
        individual_budget: 0,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setListData({
            ...listData,
            [name]: name === 'individual_budget' ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                ...listData,
                category_id: categoryId
            };
            
            const newList = await postList(formData);
            onListCreated(newList);
        } catch (err) {
            console.error("Error creating list:", err);
            setErrors({ submit: "Failed to create list. Please try again." });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="list_name">List Name:</label>
                <input
                    type="text"
                    id="list_name"
                    name="list_name"
                    value={listData.list_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="notes">Notes:</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={listData.notes}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="individual_budget">Individual Budget ($):</label>
                <input
                    type="number"
                    id="individual_budget"
                    name="individual_budget"
                    value={listData.individual_budget}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                />
            </div>

            {errors.submit && <p className="error">{errors.submit}</p>}
            
            <button type="submit">Create List</button>
        </form>
    );
}

AddListForm.propTypes = {
    categoryId: PropTypes.number.isRequired,
    onListCreated: PropTypes.func.isRequired
};

export default AddListForm;