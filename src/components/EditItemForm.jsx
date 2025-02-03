import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import putItem from "../api/put-item";
import { useAuth } from '../hooks/use-auth';
import "../pages/EditItemPage.css";


function EditItemForm({ itemId, onSubmit, onCancel }) {
    const { auth } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        ranking: '',
        store: '',
        link: '',
        comments: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    console.log('EditItemForm rendered with itemId:', itemId);
    console.log('Auth token:', auth.token);

    useEffect(() => {
        console.log('useEffect triggered with itemId:', itemId, 'and token:', auth.token);
        
        const fetchItem = async () => {
            try {
                console.log('Attempting to fetch item with URL:', `${import.meta.env.VITE_API_URL}/items/${itemId}/`);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${itemId}/`, {
                    headers: {
                        'Authorization': `Token ${auth.token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await response.json();
                console.log('Fetched item data:', data);
                setFormData({
                    name: data.name || '',
                    cost: data.cost || '',
                    ranking: data.ranking || '',
                    store: data.store || '',
                    link: data.link || '',
                    comments: data.comments || ''
                });
            } catch (err) {
                console.error('Error fetching item:', err);
                setErrors({ fetch: 'Failed to load item details' });
            } finally {
                setLoading(false);
            }
        };

        if (auth.token) {
            console.log('Token exists, calling fetchItem');
            fetchItem();
        } else {
            console.log('No token available, skipping fetch');
        }
    }, [itemId, auth.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'cost' ? (value === '' ? '' : parseFloat(value)) : 
                    name === 'ranking' ? (value === '' ? '' : parseInt(value)) : 
                    value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submissionData = {
                ...formData,
                cost: formData.cost === '' ? 0 : parseFloat(formData.cost),
                ranking: formData.ranking === '' ? null : parseInt(formData.ranking)
            };
            const updatedItem = await putItem(itemId, submissionData);
            onSubmit(updatedItem);
        } catch (err) {
            console.error("Error updating item:", err);
            setErrors({ submit: "Failed to update item. Please try again." });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (errors.fetch) return <div className="error">{errors.fetch}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Item Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <label htmlFor="cost">Cost ($):</label>
            <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                step="0.01"
                min="0"
            />
            <label htmlFor="ranking">Rank:</label>
            <input
                type="number"
                id="ranking"
                name="ranking"
                value={formData.ranking}
                onChange={handleChange}
                min="1"
            />
            <label htmlFor="store">Store:</label>
            <input
                type="text"
                id="store"
                name="store"
                value={formData.store}
                onChange={handleChange}
            />
            <label htmlFor="link">Link:</label>
            <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
            />
            <label htmlFor="comments">Comments:</label>
            <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
            />
            {errors.submit && <p className="error">{errors.submit}</p>}

            <button type="submit" className="submit-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

EditItemForm.propTypes = {
    itemId: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default EditItemForm;
