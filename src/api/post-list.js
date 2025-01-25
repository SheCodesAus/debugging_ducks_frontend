async function postPledge(amount, comment, projectID, isanonymous) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const token = window.localStorage.getItem("token");
    const supporter = window.localStorage.getItem("userID");


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "amount": amount,
            "comment": comment,
            "anonymous": isanonymous,
            "project": projectID,
        }),

    });

    if (!response.ok) {
        const fallbackError = `Error trying to add pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

async function postList(listData) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lists/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(listData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "Failed to create list");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in postList:", error);
        throw error;
    }
}

export default { postPledge, postList };