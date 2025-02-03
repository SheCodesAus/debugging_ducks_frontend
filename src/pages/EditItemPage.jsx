import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditItemForm from '../components/EditItemForm';

function EditItemPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemId } = useParams();
    const listId = location.state?.listId;

    useEffect(() => {
        if (!listId) {
            navigate('/lists');
        }
    }, [listId, navigate]);

    const handleItemUpdated = (item) => {
        console.log("Item updated:", item);
        navigate(`/list/${listId}`);
    };

    const handleCancel = () => {
        navigate(`/list/${listId}`);
    };

    // If no listId, render nothing while the useEffect handles navigation
    if (!listId) {
        return null;
    }

    return (
        <div className="edit-item-page">
            <div className="edit-item-container">
                <h1>Edit Item</h1>
                <EditItemForm
                    itemId={parseInt(itemId)}
                    onSubmit={handleItemUpdated}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default EditItemPage; 