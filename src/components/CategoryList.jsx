import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard";

function CategoryList({
  categories,
  onCreateList,
  getListsByCategory,
  onListClick,
}) {
  return (
    <>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          lists={getListsByCategory(category.id)}
          onCreateList={onCreateList}
          onListClick={onListClick}
        />
      ))}
    </>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onCreateList: PropTypes.func.isRequired,
  getListsByCategory: PropTypes.func.isRequired,
  onListClick: PropTypes.func.isRequired,
};

export default CategoryList;
