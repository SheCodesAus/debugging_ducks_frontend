async function getLists(id = null) {
    const url = `${import.meta.env.VITE_API_URL}/lists/${id}` : `${import.meta.env.VITE_API_URL}/lists`;
    // const url = id ? `http://127.0.0.1:8000/lists/${id}` : `http://127.0.0.1:8000/lists`;
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
            throw new Error(errorMessage || `Error fetching lists`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching lists`, error);
        throw error;
    }
}

export default getLists;
  