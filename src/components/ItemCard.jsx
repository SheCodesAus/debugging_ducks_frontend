import PropTypes from 'prop-types';
import "./ItemCard.css";

function ItemCard({ 
    itemName, 
    cost, 
    rank, 
    isFavorite, 
    isPurchased,
    isArchived,
    store,
    link,
    comments,
    onToggleFavorite,
    onTogglePurchased,
    onDelete
}) {
    return (
        <div className={`item-component ${isPurchased ? 'purchased' : ''} ${isArchived ? 'archived' : ''}`}>
            <p className="item-rank">{rank}</p>
            <p className="item-name">{itemName}</p>
            <p className="item-cost">${cost|| '0.00'}</p>
            <button
                className={`item-favorite ${isFavorite ? "favorite" : ""}`}
                onClick={onToggleFavorite}
                disabled={isArchived}
            >
                {isFavorite ? "♥" : "♡"}
            </button>
            <div className="item-actions">
                <input
                    type="checkbox"
                    checked={isPurchased}
                    onChange={onTogglePurchased}
                    className="item-checkbox"
                    disabled={isArchived}
                />
                {!isArchived && (
                    <button
                        className="delete-button"
                        onClick={onDelete}
                        title="Delete Item"
                    >
                        ×
                    </button>
                )}
            </div>
            {(store || link || comments) && (
                <div className="item-details">
                    {store && <p className="item-store">Store: {store}</p>}
                    {link && (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="item-link"
                        >
                            View Product
                        </a>
                    )}
                    {comments && <p className="item-comments">{comments}</p>}
                </div>
            )}
        </div>
    );
}

ItemCard.propTypes = {
    itemName: PropTypes.string.isRequired,
    cost: PropTypes.number,
    rank: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPurchased: PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
    store: PropTypes.string,
    link: PropTypes.string,
    comments: PropTypes.string,
    onToggleFavorite: PropTypes.func.isRequired,
    onTogglePurchased: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ItemCard;
