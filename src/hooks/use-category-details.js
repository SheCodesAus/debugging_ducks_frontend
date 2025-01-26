import { useState, useEffect } from "react";
import getCategory from "../api/get-category";

export default function useCategoryDetails(id = null) {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    getCategory(id)
      .then((data) => {
        setCategory(data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setCategory([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return { category, isLoading, error };
}
