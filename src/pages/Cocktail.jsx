import { useLoaderData, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
import { useQuery } from "@tanstack/react-query";

const sinlgeCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.ensureQueryData(sinlgeCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();

  const { data } = useQuery(sinlgeCocktailQuery(id));

  if (!data) return <Navigate to="/"></Navigate>;

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients1 = Object.keys(singleDrink).filter(
    (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
  );
  console.log(validIngredients1); // ['strIngredient1', 'strIngredient2', 'strIngredient3']
  const validIngredients = validIngredients1.map((key) => singleDrink[key]);
  console.log(validIngredients); // ['Galliano', 'Ginger ale', 'Ice']

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>{" "}
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {" "}
                  {item} {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructing: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
