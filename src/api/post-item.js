async function postItem(itemData) {
    try {
        const token = window.localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "Failed to create item");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in postItem:", error);
        throw error;
    }
}

export default postItem; 