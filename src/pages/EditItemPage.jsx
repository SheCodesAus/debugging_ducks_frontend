import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditItemForm from '../components/EditItemForm';
import { Navigate } from 'react-router-dom';

function EditItemPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemId } = useParams();
    const listId = location.state?.listId;

    // If no listId, use Navigate component instead of navigate function
    if (!listId) {
        return <Navigate to="/lists" replace />;
    }

    const handleItemUpdated = (item) => {
        console.log("Item updated:", item);
        navigate(`/list/${listId}`);
    };

    const handleCancel = () => {
        navigate(`/list/${listId}`);
    };

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