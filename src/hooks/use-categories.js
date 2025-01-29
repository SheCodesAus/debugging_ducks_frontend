import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";

function useCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchCategories = async () => {
            if (!auth.token) {
                setCategories([]);
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/category/`, {
                    headers: {
                        "Authorization": `Token ${auth.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();
                setCategories(data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [auth.token]);

    return { categories, isLoading, error };
}

export default useCategories; 