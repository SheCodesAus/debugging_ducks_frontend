import { useParams, useNavigate } from "react-router-dom";
import useLists from "../hooks/use-lists";
import useCategories from "../hooks/use-categories";
import { useAuth } from "../hooks/use-auth";
import Snowflakes from "../components/Snowflakes";
import CategoryList from "../components/CategoryList";
import CategoryCard from "../components/CategoryCard";
import "./ListLandingPage.css";

function ListLandingPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const { lists, isLoading: listsLoading, error: listsError } = useLists(id);
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const navigate = useNavigate();

  if (listsLoading || categoriesLoading) {
    return <div>Loading your lists... Please wait!</div>;
  }

  if (listsError || categoriesError) {
    return <div>Error: {listsError?.message || categoriesError?.message}</div>;
  }

  const handleCreateList = (categoryId, categoryName) => {
    navigate("/create-list", {
      state: { categoryId, categoryName },
    });
  };

  const handleCreateCategory = () => {
    console.log("Navigating to create-category");
    navigate("/create-category");
  };

  const handleCreateWishlistCategory = async () => {
    // Ensure token is available
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a wishlist.");
      navigate("/login");
      return;
    }

    // Check if my "Wishlist" category already exists
    const existingWishlistCategory = categories.find(
      (category) =>
        category.category_name.toLowerCase() === "my wishlist" &&
        category.wishlist === true
    );

    if (existingWishlistCategory) {
      alert("My Wishlist already exists.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            category_name: "My Wishlist",
            wishlist: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Backend-specific error message
        throw new Error(
          errorData.detail || "Failed to create wishlist category"
        );
      }
      const createdCategory = await response.json();
      alert(
        "Wishlist category created! You can now add lists under 'My Wishlist'."
      );
      window.location.reload(); // Refresh page to reflect the new category
    } catch (error) {
      console.error("Error creating wishlist:", error);
      alert(`Error creating wishlist: ${error.message}`);
    }
  };

  const handleListClick = (listId) => {
    navigate(`/list/${listId}`);
  };

  const getListsByCategory = (categoryId) => {
    return lists ? lists.filter((list) => list.category_id === categoryId) : [];
  };

  // If user is not logged in, redirect to home page
  if (!auth.token) {
    navigate("/");
  }

  return (
    <div className="list-landing-page">
      <Snowflakes />

      <div className="list-landing-container">
        <button onClick={handleCreateWishlistCategory}>
          Create My Wishlist
        </button>

        <div className="categories-grid">
          {categories && categories.length > 0 ? (
            <CategoryList
              categories={categories}
              onCreateList={handleCreateList}
              getListsByCategory={getListsByCategory}
              onListClick={handleListClick}
            />
          ) : (
            <div className="empty-categories">
              <p>You don&apos;t have a wishlist or any categories yet.</p>
              <p>Create your wishlist or category to get started!</p>
            </div>
          )}
        </div>

        <button onClick={handleCreateCategory}>Create New Category</button>
      </div>
    </div>
  );
}

export default ListLandingPage;
