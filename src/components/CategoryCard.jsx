import PropTypes from 'prop-types';

function CategoryCard({ category, lists, onCreateList, onListClick }) {
    return (
        <div className="category-card">
            <h3>{category.category_name}</h3>
            <p>Budget: ${category.category_budget}</p>
            <div className="category-lists">
                {lists.map(list => (
                    <div 
                        key={list.id} 
                        className="list-header"
                        onClick={() => onListClick(list.id)}
                    >
                                <h4>{list.list_name}</h4>
                                <p>Budget: ${list.individual_budget}</p>
                                {list.notes && <p className="list-notes">{list.notes}</p>}
                            </div>
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
    onCreateList: PropTypes.func.isRequired,
    onListClick: PropTypes.func.isRequired
};

export default CategoryCard; 