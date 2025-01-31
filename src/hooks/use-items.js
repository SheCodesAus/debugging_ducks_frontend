import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import getItems from "../api/get-items";
import postItem from "../api/post-item";
import putItem from "../api/put-item";

function useItems(listId) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchItems = async () => {
            if (!auth.token || !listId) {
                setItems([]);
                setIsLoading(false);
                return;
            }

            try {
                const data = await getItems(listId);
                setItems(data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchItems();
    }, [auth.token, listId]);

    const addItem = async (itemData) => {
        try {
            const newItem = await postItem({ ...itemData, list_id: listId });
            setItems(prevItems => [...prevItems, newItem]);
            return newItem;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateItem = async (itemId, itemData) => {
        try {
            const updatedItem = await putItem(itemId, itemData);
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? updatedItem : item
                )
            );
            return updatedItem;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const toggleFavorite = async (itemId) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            await updateItem(itemId, { favourite: !item.favourite });
        }
    };

    const togglePurchased = async (itemId) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            await updateItem(itemId, { purchased: !item.purchased });
        }
    };

    return {
        items,
        isLoading,
        error,
        addItem,
        updateItem,
        toggleFavorite,
        togglePurchased
    };
}

export default useItems; 