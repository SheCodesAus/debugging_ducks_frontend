async function getCategory(id = null) {
    const url = `${import.meta.env.VITE_API_URL}/category/${id}` : `${import.meta.env.VITE_API_URL}/category`;
    // const url = id ? `http://127.0.0.1:8000/category/${id}` : `http://127.0.0.1:8000/category`;
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
            throw new Error(errorMessage || `Error fetching category`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching category`, error);
        throw error;
    }
}

export default getCategory;
  