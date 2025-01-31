import { useState } from "react";
import PropTypes from 'prop-types';
import "./AddItemForm.css";

function AddItemForm({ onSubmit, onCancel, currentRanking }) {
    const [formData, setFormData] = useState({
        name: "",
        store: "",
        link: "",
        image: "",
        ranking: currentRanking,
        cost: "",
        comments: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'cost' || name === 'ranking' ? 
                (value === '' ? '' : parseInt(value, 10)) : 
                value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="add-item-form-container">
            <form onSubmit={handleSubmit} className="add-item-form">
                <h3>Add New Item</h3>
                
                <div className="form-group">
                    <label htmlFor="name">Item Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="store">Store</label>
                    <input
                        type="text"
                        id="store"
                        name="store"
                        value={formData.store}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Product URL</label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
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
                    </div>

                    <div className="form-group">
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
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        maxLength="255"
                        rows="3"
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="submit-button">
                        Add Item
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="cancel-button"
                    >
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
    currentRanking: PropTypes.number.isRequired
};

export default AddItemForm; 