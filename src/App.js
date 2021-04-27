import Axios from "axios";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import Alert from "./components/Alert";
import Recipe from "./components/Recipe";
import logo from "./img/logo64.png";
import "./App.css";

export default function App() {
  const category = [
    "chicken",
    "fish",
    "beef",
    "pork",
    "lamb",
    "duck",
    "pies",
    "juice",
  ];
  const random = Math.floor(Math.random() * category.length + 1);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(category[random]);
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const getRecipes = async () => {
      try {
        if (query !== "") {
          const response = await Axios.get(apiUrl);
          if (!response.data.more) {
            return setAlert("Recipe Not Found");
          }
          setRecipes(response.data.hits);
          setQuery("");
          setAlert("");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRecipes();
  }, [apiUrl, query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1>
        EatMe <img className="logo" src={logo} alt="" /> Recipes
      </h1>
      {alert !== "" && <Alert alert={alert} />}
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search Recipes"
          autoComplete="off"
          onChange={updateSearch}
          value={search}
        />
        <button className="btn search-btn" type="submit">
          Search
        </button>
      </form>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
      >
        <Masonry columnsCount={4} gutter="15px" className="recipe-container">
          {recipes !== [] &&
            recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
