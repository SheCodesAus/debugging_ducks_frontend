async function postList(listData) {
    try {
        const token = window.localStorage.getItem("token");
        console.log("Token being used:", token);
        console.log("List data being sent:", listData);

        // const url = `${import.meta.env.VITE_API_URL}/lists/`;
        const url = 'http://127.0.0.1:8000/lists/';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listData),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            const data = await response.json();
            console.error("Error response data:", data);
            throw new Error(data.detail || "Failed to create list");
        }

        const responseData = await response.json();
        console.log("Success response:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error in postList:", error);
        throw error;
    }
}

export default postList;