async function postSignup(signupData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Signup failed:", responseData.message);
            throw new Error(responseData.details || "Signup failed. Please check your input.");
        }

        console.log("Signup successful:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}

export default postSignup;