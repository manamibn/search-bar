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
    <div className="container">
      <div className="input-container">
        <input
          type="search"
          placeholder="search for drinks..."
          value={drinks.query}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <ul className="list-items">
        {drinks.query === ""
          ? "No drinks to show"
          : !drinks.resultList.length
          ? "Ooops... No match found!"
          : drinks.resultList.map((dr) => {
              return (
                <div className="list">
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
    </div>
  );
}

export default App;
