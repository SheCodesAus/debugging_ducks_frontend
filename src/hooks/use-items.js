import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import getItems from "../api/get-items";
import putItem from "../api/put-item";

function useItems(listId) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const authContext = useAuth();

    useEffect(() => {
        if (!listId) return;

        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const data = await getItems(listId);
                console.log('Items received from API:', data);
                // Add a temporary filter to see if items are actually archived
                const activeItems = data.filter(item => {
                    if (item.archived_at) {
                        console.log('Found archived item:', item);
                        return false;
                    }
                    return true;
                });
                setItems(activeItems);
                setError(null);
            } catch (err) {
                setError(err);
                console.error('Error fetching items:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, [listId]);

    const addItem = async (itemData) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authContext.auth.token}`,
            },
            body: JSON.stringify({ ...itemData, list_id: listId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const newItem = await response.json();
        setItems(prevItems => [...prevItems, newItem]);
        return newItem;
    };

    const toggleFavorite = async (itemId) => {
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        const updatedItem = await putItem(itemId, {
            ...item,
            favourite: !item.favourite
        });
        setItems(prevItems =>
            prevItems.map(i => i.id === itemId ? updatedItem : i)
        );
    };

    const togglePurchased = async (itemId) => {
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        const updatedItem = await putItem(itemId, {
            ...item,
            purchased: !item.purchased
        });
        setItems(prevItems =>
            prevItems.map(i => i.id === itemId ? updatedItem : i)
        );
    };

    const toggleArchived = async (itemId) => {
        console.log('Current auth state:', authContext);
        const userData = authContext.auth?.user;
        console.log('User data:', userData);

        if (!userData || !userData.id) {
            console.log('Missing user data:', { authContext });
            throw new Error('User must be logged in to archive items');
        }

        const item = items.find(i => i.id === itemId);
        if (!item || item.archived_at) return; // Don't allow unarchiving

        await putItem(itemId, {
            ...item,
            archived_at: new Date().toISOString(),
            archived_by: userData.id
        });

        // Remove the archived item from the list
        setItems(prevItems =>
            prevItems.filter(i => i.id !== itemId)
        );
    };

    return {
        items,
        isLoading,
        error,
        addItem,
        toggleFavorite,
        togglePurchased,
        toggleArchived
    };
}

export default useItems; 