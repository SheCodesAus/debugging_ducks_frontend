import PropTypes from 'prop-types';
import "./ItemCard.css";

function ItemCard({ 
    itemName, 
    cost, 
    rank, 
    isFavorite, 
    isPurchased,
    store,
    link,
    comments,
    onToggleFavorite,
    onTogglePurchased 
}) {
    return (
        <div className={`item-component ${isPurchased ? 'purchased' : ''}`}>
            <input
                type="checkbox"
                checked={isPurchased}
                onChange={onTogglePurchased}
                className="item-checkbox"
            />
            <div className="item-content">
                <div className="item-main">
                    <p className="item-name">{itemName}</p>
                    <p className="item-cost">${cost?.toFixed(2) || '0.00'}</p>
                    <p className="item-rank">Rank: {rank}</p>
                    <button
                        className={`item-favorite ${isFavorite ? "favorite" : ""}`}
                        onClick={onToggleFavorite}
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>
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
        </div>
    );
}

ItemCard.propTypes = {
    itemName: PropTypes.string.isRequired,
    cost: PropTypes.number,
    rank: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPurchased: PropTypes.bool.isRequired,
    store: PropTypes.string,
    link: PropTypes.string,
    comments: PropTypes.string,
    onToggleFavorite: PropTypes.func.isRequired,
    onTogglePurchased: PropTypes.func.isRequired
};

export default ItemCard;
