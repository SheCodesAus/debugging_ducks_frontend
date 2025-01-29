import PropTypes from 'prop-types';

function ListItem({ list }) {
    return (
        <div className="list-item">
            <h4>{list.list_name}</h4>
            <p>Budget: ${list.individual_budget}</p>
            {list.notes && <p className="list-notes">{list.notes}</p>}
        </div>
    );
}

ListItem.propTypes = {
    list: PropTypes.object.isRequired
};

export default ListItem; 