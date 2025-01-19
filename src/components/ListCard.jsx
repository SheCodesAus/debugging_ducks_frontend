import useAuth from "../hooks/use-auth";

function ListCard(props) {
  const { auth } = useAuth();
  const { listData } = props;

  if (Array.isArray(listData)) {
    return (
      <div>
        <h1>Lists</h1>
        <ul>
          {listData.map((list) => (
            <li key={list.id}>
              <a href={`/lists/${list.id}`}>{list.list_name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // If it's a single list, show details
  return (
    <div>
      <h1>{listData.list_name}</h1>
      <p>{listData.notes}</p>
    </div>
  );
}

export default ListCard;
