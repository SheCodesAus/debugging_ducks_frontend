import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditItemForm from '../components/EditItemForm';

function EditItemPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemId } = useParams();
    const listId = location.state?.listId;

    const handleItemUpdated = (item) => {
        console.log("Item updated:", item);
        navigate(`/list/${listId}`);
    };

    const handleCancel = () => {
        navigate(`/list/${listId}`);
    };

    if (!listId) {
        navigate('/lists');
        return null;
    }

    return (
        <div className="edit-item-page">
            <div className="edit-item-container">
                <h1>Edit Item</h1>
                <EditItemForm
                    itemId={itemId}
                    onSubmit={handleItemUpdated}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default EditItemPage; 