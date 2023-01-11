import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState({
    query: "",
    resultList: [],
  });
  const [userList, setUserList] = useState([]);

  const fetchUser = () => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => setUserList([data.results[0]]));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleChange = (e) => {
    console.log("users--", userList);
    console.log("e--", e.target.value);
    const list = userList.filter((user) => {
      if (e.target.value === "") {
        return userList;
      } else {
        console.log("title--", user);
        return user.name.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    });
    setUsers({
      query: e.target.value,
      resultList: list,
    });
  };
  return (
    <div className="App">
      <form>
        <input
          type="search"
          value={users.query}
          onChange={(e) => handleChange(e)}
        />
      </form>
      <ul>
        {users.query === ""
          ? "No list to show"
          : !users.resultList.length
          ? "Your query did not return any results"
          : users.resultList.map((us) => {
              return (
                <li key={us.name.title}>
                  {us.name.title}. {us.name.first} {us.name.last} {"from, "}
                  {us.location.city}, {us.location.country}{" "}
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default App;
