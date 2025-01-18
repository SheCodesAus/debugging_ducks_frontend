// import React, { useState, useEffect } from "react";

// const ListLandingPage = () => {
//     const [allLists, setAllLists] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:3000/lists")
//             .then((response) => response.json())
//             .then((data) => setAllLists(data));
//     }, []);
//     return (
//         <div>
//             <h1>Lists</h1>
//             <ul>
//                 {allLists.map((list) => (
//                     <li key={list.id}>
//                         <a href={`/lists/${list.id}`}>{list.name}</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
// );
// };

// export default ListLandingPage;