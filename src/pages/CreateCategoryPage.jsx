import { useNavigate } from "react-router-dom";
import CreateCategoryForm from "../components/CreateCategoryForm";
import "./CreateListPage.css"; // We can reuse the same CSS

function CreateCategoryPage() {
  const navigate = useNavigate();
  
    const handleCategoryCreated = (category) => {
            console.log("Category created:", category);
            navigate('/lists');
    };

    return (
          <div className="create-list-page">
              <CreateCategoryForm onCategoryCreated={handleCategoryCreated} />
          </div>
    );
}

export default CreateCategoryPage;