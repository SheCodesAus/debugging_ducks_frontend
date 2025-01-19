import { Link } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function ListCard(props) {
  const { listData } = props;

  return (
    <div>
      <Link to="/lists">
        <h3>{listData.name}</h3>
      </Link>
    </div>
  );
}

export default ListCard;