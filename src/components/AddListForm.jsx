import { useState } from "react";
import postList from "../api/post-list";

function AddListForm({ categoryId, onListCreated }) {
    const [listData, setListData] = useState({
        title: "",
        description: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setListData({
            ...listData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                ...listData,
                category: categoryId,
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
                <label htmlFor="title">List Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={listData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={listData.description}
                    onChange={handleChange}
                />
            </div>

            {errors.submit && <p className="error">{errors.submit}</p>}
            
            <button type="submit">Create List</button>
        </form>
    );
}

export default AddListForm;