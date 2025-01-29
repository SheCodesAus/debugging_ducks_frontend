import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import getCategory from "../api/get-category";

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
                const data = await getCategory();
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