import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCategoryForm from "../components/AddCategoryForm";
import AddListForm from "../components/AddListForm";
import "./CreateListPage.css";

function CreateListPage() {
    const [step, setStep] = useState('category'); // 'category' or 'list'
    const [createdCategory, setCreatedCategory] = useState(null);
    const navigate = useNavigate();

    const handleCategoryCreated = (category) => {
        setCreatedCategory(category);
        setStep('list');
    };

    const handleListCreated = (list) => {
        console.log("List created:", list);
        // Redirect to the lists page
        navigate('/lists');
    };

    return (
        <div className="create-list-page">
            {step === 'category' ? (
                <div>
                    <AddCategoryForm onCategoryCreated={handleCategoryCreated} />
                </div>
            ) : (
                <div>
                    <h2>Now, Create Your List</h2>
                    <AddListForm 
                        categoryId={createdCategory.id} 
                        onListCreated={handleListCreated}
                    />
                </div>
            )}
        </div>
    );
}

export default CreateListPage;