async function putItem(itemId, itemData) {
    try {
        const token = window.localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${itemId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "Failed to update item");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in putItem:", error);
        throw error;
    }
}

export default putItem; 