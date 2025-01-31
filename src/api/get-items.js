async function getItems(listId = null) {
    const url = listId
        ? `${import.meta.env.VITE_API_URL}/items/?list_id=${listId}`
        : `${import.meta.env.VITE_API_URL}/items/`;
    const token = window.localStorage.getItem("token");

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || `Error fetching items`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching items:`, error);
        throw error;
    }
}

export default getItems; 