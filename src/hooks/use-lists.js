import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";

function useLists(categoryId) {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchLists = async () => {
      if (!auth.token) {
        setLists([]);
        setIsLoading(false);
        return;
      }

      try {
        const url = categoryId
          ? `${import.meta.env.VITE_API_URL}/lists/?category=${categoryId}`
          : `${import.meta.env.VITE_API_URL}/lists/`;

        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch lists");
        }

        const data = await response.json();
        setLists(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchLists();
  }, [auth.token, categoryId]); // Add auth.token as dependency

  return { lists, isLoading, error };
}

export default useLists;
