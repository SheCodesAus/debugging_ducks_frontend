import PropTypes from 'prop-types';
import ListItem from './ListItem';

function CategoryCard({ category, lists, onCreateList }) {
    return (
        <div className="category-card">
            <h3>{category.category_name}</h3>
            <p>Budget: ${category.category_budget}</p>
            <div className="category-lists">
                {lists.map(list => (
                    <ListItem key={list.id} list={list} />
                ))}
                <button 
                    onClick={() => onCreateList(category.id, category.category_name)}
                    className="create-list-button"
                >
                    Create List
                </button>
            </div>
        </div>
    );
}

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired,
    lists: PropTypes.array.isRequired,
    onCreateList: PropTypes.func.isRequired
};

export default CategoryCard; 