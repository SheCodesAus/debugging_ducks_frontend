import { useNavigate } from "react-router-dom";
import AddListForm from "../components/AddListForm";
import "./CreateListPage.css";

function CreateListPage() {
    const navigate = useNavigate();

    const handleListCreated = (list) => {
        console.log("List created:", list);
        navigate('/lists');
    };

    return (
        <div className="create-list-page">
            <AddListForm onListCreated={handleListCreated} />
        </div>
    );
}

export default CreateListPage;