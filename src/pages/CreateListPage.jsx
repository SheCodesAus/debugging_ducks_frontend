import { useNavigate, useLocation } from "react-router-dom";
import AddListForm from "../components/AddListForm";
import "./CreateListPage.css";
import Snowflakes from "../components/Snowflakes"; 

function CreateListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName;

  const handleListCreated = (list) => {
    console.log("List created:", list);
    navigate("/lists");
  };

  if (!categoryId) {
    navigate("/lists");
    return null;
  }

  return (
    <div className="create-list-page">
      {/* Snowflakes Component */}
      <Snowflakes />

      <AddListForm
        categoryId={categoryId}
        categoryName={categoryName}
        onListCreated={handleListCreated}
      />
    </div>
  );
}

export default CreateListPage;
