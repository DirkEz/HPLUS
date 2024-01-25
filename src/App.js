// import 'dotenv/config'
import { useState } from "react";


function App() {
  const API_URL = "https://api.nal.usda.gov/fdc/v1/";
  const API_KEY = "MhQXregnEYA65Xm7uRHhRBDJQKSxoPMiQWkunI3Q";
  const [results, setResults] = useState([]);

  const handleUserInput = (e) => {
    if(e.key !== "Enter") {
      return;
    }

    fetch(`${API_URL}/foods/search?api_key=${API_KEY}&query=${e.target.value}&pageSize=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setResults(data.foods);
      });
  };
  
  return (
    <div className="App">
      <div>
        <label for="search">Zoeken naar voedsel</label> <br/>
        <input className="border border-black" onKeyDown={handleUserInput} name='search' type='text' placeholder='Zoeken'/>

        <div className="flex flex-row flex-wrap col-span-2 justify-start items-start mt-5 w-full">
          {results.map((food) => {
            return (
              <div className="w-1/3 p-2 border border-black">
                <p><b>{food.brandName} {food.description}</b></p>
                <p>Nutritional Content:</p>
                <ul className="list-disc list-inside">
                  {food.foodNutrients.map((nutrient) => {
                    return (
                      <li>
                        {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName.toLowerCase()}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
