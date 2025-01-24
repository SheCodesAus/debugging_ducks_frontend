import { useParams } from "react-router-dom";
import ListCard from "../components/ListCard";
import useLists from "../hooks/use-lists";
import { useAuth } from "../hooks/use-auth";

function ListLandingPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const { lists, isLoading, error } = useLists(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // If there's no list data, show an empty state
  if (!lists || lists.length === 0) {
    return <div>No list found.</div>;
  }

  // If auth token is present, render ListCard with the single list
  return (
    <div>
      {auth.token ? (
        <ListCard listData={lists} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ListLandingPage;
