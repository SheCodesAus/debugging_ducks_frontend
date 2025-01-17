import { allLists } from "../data";

return (
    <div>
        <h1>Lists</h1>
        <ul>
            {allLists.map((list) => (
                <li key={list.id}>
                    <a href={`/lists/${list.id}`}>{list.name}</a>
                </li>
            ))}
        </ul>
    </div>
);