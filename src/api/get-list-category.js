async function getListCategories(id = null) {
    // const url = `${import.meta.env.VITE_API_URL}/lists`;
    const url = id ? `http://127.0.0.1:8000/listcategory/${id}` : `http://127.0.0.1:8000/listcategory`;
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
            throw new Error(errorMessage || `Error fetching categories`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching categories`, error);
        throw error;
    }
}

export default getCategories;
  