import { useParams, useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";
import useLists from "../hooks/use-lists";
import useCategories from "../hooks/use-categories";
import { useAuth } from "../hooks/use-auth";
import './ListLandingPage.css';

function ListLandingPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const { lists, isLoading: listsLoading, error: listsError } = useLists(id);
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const navigate = useNavigate();

  if (listsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (listsError || categoriesError) {
    return <div>Error: {listsError?.message || categoriesError?.message}</div>;
  }

  // If there's no list data, show an empty state
  if (!lists || lists.length === 0) {
    return <div>No list found.</div>;
  }
    
  const handleCreateList = () => {
    navigate('/create-list');
  };

  return (
    <div className="list-landing-container">
      {auth.token && (
        <>
          <div className="categories-section">
            <h2>Your Categories</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <div key={category.id} className="category-card">
                  <h3>{category.category_name}</h3>
                  <p>Budget: ${category.category_budget}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lists-section">
            <h2>Your Lists</h2>
            <ListCard listData={lists} />
          </div>

          <div>
            <button 
              onClick={handleCreateList}
              className="create-list-button"
            >
              Create List
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ListLandingPage;
