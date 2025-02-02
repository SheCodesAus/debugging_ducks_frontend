import { useNavigate } from "react-router-dom";
import CreateCategoryForm from "../components/CreateCategoryForm";
import "./CreateListPage.css";
import Snowflakes from "../components/Snowflakes"; // Import Snowflakes component

function CreateCategoryPage() {
  const navigate = useNavigate();

  const handleCategoryCreated = (category) => {
    console.log("Category created:", category);
    navigate("/lists");
  };

  return (
    <div className="create-list-page">
      {/* Snowflakes Component */}
      <Snowflakes />

      <CreateCategoryForm onCategoryCreated={handleCategoryCreated} />
    </div>
  );
}

export default CreateCategoryPage;
