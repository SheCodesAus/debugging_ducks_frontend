import { useParams, useNavigate } from "react-router-dom";
import useLists from "../hooks/use-lists";
import useCategories from "../hooks/use-categories";
import { useAuth } from "../hooks/use-auth";
import CategoryList from "../components/CategoryList";
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

    const handleCreateList = (categoryId, categoryName) => {
        navigate('/create-list', { 
            state: { categoryId, categoryName }
        });
    };

    const handleCreateCategory = () => {
        console.log("Navigating to create-category");
        navigate('/create-category');
    };

    const handleListClick = (listId) => {
        navigate(`/list/${listId}`);
    };

    const getListsByCategory = (categoryId) => {
        return lists ? lists.filter(list => list.category_id === categoryId) : [];
    };

    return (
        <div className="list-landing-container">
            {auth.token && (
                <div className="categories-section">
                    <div className="categories-header">
                        <h2>Your Categories</h2>
                        <button 
                            onClick={handleCreateCategory}
                            className="create-category-button"
                        >
                            Create New Category
                        </button>
                    </div>
                    {categories && categories.length > 0 ? (
                        <CategoryList 
                            categories={categories}
                            onCreateList={handleCreateList}
                            getListsByCategory={getListsByCategory}
                            onListClick={handleListClick}
                        />
                    ) : (
                        <div className="empty-categories">
                            <p>You don&apos;t have any categories yet.</p>
                            <p>Create your first category to get started!</p>
                            <button 
                                onClick={handleCreateCategory}
                                className="create-first-category-button"
                            >
                                Create Your First Category
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ListLandingPage;
