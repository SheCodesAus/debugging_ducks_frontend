async function postCategory(categoryData) {
    try {
        const token = localStorage.getItem("token");
        console.log(categoryData);
        console.log(token);
        
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Token ${token}`,
        //     },
        //     body: JSON.stringify(categoryData),
        // });
        const response = await fetch(`http://127.0.0.1:8000/category/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "Failed to create category");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in postCategory:", error);
        throw error;
    }
}

export default postCategory;