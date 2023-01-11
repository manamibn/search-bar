import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [drinks, setDrinks] = useState({
    query: "",
    resultList: [],
  });
  const [drinkList, setDrinkList] = useState([]);

  const fetchdrinks = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then((res) => res.json())
      .then((data) => setDrinkList(data.drinks));
  };
  useEffect(() => {
    fetchdrinks();
  }, []);
  const handleChange = (e) => {
    console.log("drinks--", drinkList);
    console.log("e--", e.target.value);
    const list = drinkList.filter((drink) => {
      if (e.target.value === "") {
        return drinkList;
      } else {
        return drink.strDrink
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    });
    setDrinks({
      query: e.target.value,
      resultList: list,
    });
  };
  return (
    <div className="App">
      <form>
        <input
          type="search"
          value={drinks.query}
          onChange={(e) => handleChange(e)}
        />
        <ul>
          {drinks.query === ""
            ? "No drinks to show"
            : !drinks.resultList.length
            ? "Your query did not return any results"
            : drinks.resultList.map((dr) => {
                return (
                  <div style={{ padding: "10px" }}>
                    <li key={dr.idDrink}>
                      {dr.strDrink} - {dr.strAlcoholic} - {dr.strCategory} -
                      {dr.strGlass}
                    </li>
                    <img
                      src={dr.strDrinkThumb}
                      alt="nothing found"
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                );
              })}
        </ul>
      </form>
    </div>
  );
}

export default App;
