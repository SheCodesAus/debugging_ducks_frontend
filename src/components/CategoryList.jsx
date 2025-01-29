import PropTypes from 'prop-types';
import CategoryCard from './CategoryCard';

function CategoryList({ categories, onCreateList, getListsByCategory }) {
    return (
        <div className="categories-grid">
            {categories.map((category) => (
                <CategoryCard 
                    key={category.id}
                    category={category}
                    lists={getListsByCategory(category.id)}
                    onCreateList={onCreateList}
                />
            ))}
        </div>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    onCreateList: PropTypes.func.isRequired,
    getListsByCategory: PropTypes.func.isRequired
};

export default CategoryList; 