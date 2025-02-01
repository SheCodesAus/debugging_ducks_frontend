import PropTypes from "prop-types";
import ListItem from "./ListItem";
import LeftVector from "../img/vector-1.png";
import RightVector from "../img/vector-2.png";

function CategoryCard({ category, lists, onCreateList }) {
  return (
    <div className="category-card">
      <div className="category-group">
        <img
          className="flourish-design"
          src={LeftVector}
          alt="left flourish image"
        />
        <h3> {category.category_name} </h3>
        <img
          className="flourish-design"
          src={RightVector}
          alt="right flourish image" 
        />
      </div>

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
