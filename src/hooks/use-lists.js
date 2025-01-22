import { useState, useEffect } from "react";
import getLists from "../api/get-lists";

export default function useLists(id = null) {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    getLists(id)
      .then((data) => {
        setLists(data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLists([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return { lists, isLoading, error };
}
