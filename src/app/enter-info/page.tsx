'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";

const allergens = [
    { letter: "D", color: "bg-blue-500", tooltip: "Dairy", value: "dairy" },
    { letter: "E", color: "bg-yellow-500", tooltip: "Eggs", value: "egg" },
    { letter: "S", color: "bg-lime-500", tooltip: "Soy", value: "soy" },
    { letter: "G", color: "bg-amber-500", tooltip: "Gluten", value: "gluten" },
    { letter: "N", color: "bg-red-500", tooltip: "Nuts", value: "nuts" },
    { letter: "SS", color: "bg-orange-500", tooltip: "Sesame", value: "sesame" },
    { letter: "F", color: "bg-pink-500", tooltip: "Fish", value: "fish" },
    { letter: "SF", color: "bg-teal-500", tooltip: "Shellfish", value: "shellfish" },
  ];

const diets = [
    { letter: "V", color: "bg-emerald-800", tooltip: "Vegetarian", value:"vegetarian"  },
    { letter: "VG", color: "bg-purple-500", tooltip: "Vegan", value:"vegan"  },
    { letter: "HF", color: "bg-cyan-500", tooltip: "Halal Friendly", value:"HalalFriendly" },
  ];



/*Switched them around to save time instead of actually switching them */
const dining_halls = ["Breakfast", "Lunch", "Dinner"]
const meals = ["Yahentamitsi", "251", "South"]




export default function EnterInformation() {

    const [allergens_values, setAllergensValues] = useState<{ [key: string]: boolean }>({
        dairy: false,
        egg: false,
        soy: false,
        gluten: false,
        nuts: false,
        sesame: false,
        fish: false,
        shellfish: false,
        vegan: false,
        vegetarian: false,
        HalalFriendly: false,
      });

    
    const [caloriesSelected, setcaloriesSelected] = useState<string>("");
    const [hallSelected, setHallSelected] = useState<string>("");
    const [mealSelected, setMealSelected] = useState<string>("");

    const isFormValid = caloriesSelected !== "" && hallSelected !== "" && mealSelected !== "";



    // const [inputValueCalories, setinputValueCalories] = useState("");
    // const [inputValueCalories, setinputValueCalories] = useState<number>(0); // Set initial value as 0
    const [inputValueCalories, setinputValueCalories] = useState<number | string>(0); // Allow number or string (for empty input)
    const maxValue = 9999; // Define the max value for the input
    



    // useEffect(() => {
    //     // console.log(inputValueCalories);  // Log the updated value after state change
    //   }, [inputValueCalories]);  // Dependency on inputValueCalories

    // const [inputValueProtein, setinputValueProtein] = useState("");
    const [inputValueProtein, setinputValueProtein] = useState<number | string>(0); // Allow number or string (for empty input)


    // const [inputValueCarbs, setinputValueCarbs] = useState("");
    const [inputValueCarbs, setinputValueCarbs] = useState<number | string>(0); // Allow number or string (for empty input)

    // const [inputValueFat, setinputValueFat] = useState("");
    const [inputValueFat, setinputValueFat] = useState<number | string>(0); // Allow number or string (for empty input)


    
    const [clickedOne, setClickedOne] = useState(Array(8).fill(false));
    const [hoveredIndexOne, setHoveredIndexOne] = useState<number | null>(null);
    const [clickedTwo, setClickedTwo] = useState(Array(3).fill(false));
    const [hoveredIndexTwo, setHoveredIndexTwo] = useState<number | null>(null);


    /*Meal selection*/
    const [clickedMeal, setClickedMeal] = useState<number | null>(null);

    // const [clickedMeal, setClickedMeal] = useState([false, false, false]);

    /*Dining hall*/
    const [clickedHall, setClickedHall] = useState([false, false, false]);


    const toggleClickOne = (index: number) => {   
        const updated = [...clickedOne];
        updated[index] = !updated[index];
        setClickedOne(updated);  
    };
    const toggleClickTwo = (index: number) => {
        const updated = [...clickedTwo];
        updated[index] = !updated[index];
        setClickedTwo(updated); 
    };

    const toggleAllergens = (index: number) => {
        toggleClickOne(index);
    }



    const handleInputChangeCalories = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Parse the value as a number to ensure it's treated as a number
        // const value = e.target.value ? parseInt(e.target.value, 10) : 0; 
        // setinputValueCalories(value);
        const value = e.target.value;
        // If the input value is empty, allow it to be cleared
        if (value === "") {
            setinputValueCalories("");
            setcaloriesSelected("");
        } else {
            // Otherwise, parse the value as a number
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                if (parsedValue <= maxValue) {
                    setinputValueCalories(parsedValue);
                } 
                // else {
                //     // Optionally handle the case where the value exceeds max
                //     setinputValueCalories(maxValue);
                // }
            }
            setcaloriesSelected("valid");
        }
    };

    const handleInputChangeProtein = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Parse the value as a number to ensure it's treated as a number
        // const value = e.target.value ? parseInt(e.target.value, 10) : 0; 
        // setinputValueCalories(value);

        const value = e.target.value;
        // If the input value is empty, allow it to be cleared
        if (value === "") {
            setinputValueProtein("");
        } else {
        // Otherwise, parse the value as a number
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                if (parsedValue <= maxValue) {
                    setinputValueProtein(parsedValue);
                } 
                // else {
                //     // Optionally handle the case where the value exceeds max
                //     setinputValueProtein(maxValue);
                // }
            }
        }
    };

    const handleInputChangeCarbs = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Parse the value as a number to ensure it's treated as a number
        // const value = e.target.value ? parseInt(e.target.value, 10) : 0; 
        // setinputValueCalories(value);
        const value = e.target.value;
        // If the input value is empty, allow it to be cleared
        if (value === "") {
            setinputValueCarbs("");
        } else {
            // Otherwise, parse the value as a number
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                if (parsedValue <= maxValue) {
                    setinputValueCarbs(parsedValue);
                } 
                // else {
                //     // Optionally handle the case where the value exceeds max
                //     setinputValueCarbs(maxValue);
                // }
            }
        }
    };


    const handleInputChangeFat = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Parse the value as a number to ensure it's treated as a number
        // const value = e.target.value ? parseInt(e.target.value, 10) : 0; 
        // setinputValueCalories(value);


        const value = e.target.value;
        // If the input value is empty, allow it to be cleared
        if (value === "") {
            setinputValueFat("");
        } else {
            // Otherwise, parse the value as a number
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                if (parsedValue <= maxValue) {
                    setinputValueFat(parsedValue);
                } 
                //else {
                //     // Optionally handle the case where the value exceeds max
                //     setinputValueFat(maxValue);
                // }
            }
        }
    };


    const handleClickMeal = (index: number) => {
        setClickedMeal(clickedMeal === index ? null : index);
        setHallSelected("valid");
    };


    const handleClickHall = (index: number) => {
        const updatedClickedHall = [...clickedHall];
        updatedClickedHall[index] = !updatedClickedHall[index];
        setClickedHall(updatedClickedHall);
        setMealSelected("valid");
    };

    const isNumber = (value: number | string): value is number => {
        return typeof value === "number";
    };

    return (
    <div>
      <div className="absolute top-[8vh] left-1/2 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Please enter the following information</h1>
      </div>
      <br></br>
      <div className="absolute top-[15vh] left-1/2 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Calories<span className="text-red-500">*</span></h1>
      </div>

      <div className="absolute top-[15vh] left-[10vw] transform -translate-x-1/2 items-center justify-center text-center font-bold">
        <h1>Step 1: Macros</h1>
      </div>

      <div
        className={`absolute top-[20vh] left-1/2 transform -translate-x-1/2 w-[19vw] h-[19vw] rounded-full flex items-center justify-center border-8 z-10 ${
           isNumber(inputValueCalories) && inputValueCalories > 0  ? "border-blue-500" : "border-black"
        }`}
        // className={`absolute top-[20vh] left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full flex items-center justify-center border-8 z-10 ${
        //     isNumber(inputValueCalories) && inputValueCalories > 0  ? "border-blue-500" : "border-black"
        //  }`}
      >
        <input
          type="number"
          value={inputValueCalories}
          onChange={handleInputChangeCalories}
          step = "1"
          className="w-24 h-24 bg-transparent text-black text-3xl text-center outline-none"
        />
      </div>

      {/* Global CSS to remove spinner/scrollbar for number input */}
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="absolute top-[32vh] left-1/4 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Protein(g)</h1>
      </div>
      <div
        // className={`absolute top-[36vh] left-1/4 transform -translate-x-1/2 w-30 h-30 rounded-full flex items-center justify-center border-6 z-10 ${
        //     isNumber(inputValueProtein) && inputValueProtein > 0  ? "border-blue-500" : "border-black"
        // }`}
        className={`absolute top-[36vh] left-1/4 transform -translate-x-1/2 w-[9vw] h-[9vw] rounded-full flex items-center justify-center border-5 z-10 ${
            isNumber(inputValueProtein) && inputValueProtein > 0  ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="number"
          value={inputValueProtein}
          onChange={handleInputChangeProtein}
          className="w-24 h-24 bg-transparent text-black text-3xl text-center outline-none"
        />
      </div>

      {/* Global CSS to remove spinner/scrollbar for number input */}
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>


      <div className="absolute top-[22vh] left-13/16 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Carbs(g)</h1>
      </div>
      <div
        // className={`absolute top-[22vh] left-3/4 transform -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center border-4 ${
        //     isNumber(inputValueCarbs) && inputValueCarbs > 0 ? "border-blue-500" : "border-black"
        // }`}
        className={`absolute top-[22vh] left-3/4 transform -translate-x-1/2 w-[7vw] h-[7vw] rounded-full flex items-center justify-center border-3 ${
            isNumber(inputValueCarbs) && inputValueCarbs > 0 ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="number"
          value={inputValueCarbs}
          onChange={handleInputChangeCarbs}
          className="w-24 h-24 bg-transparent text-black text-3xl text-center outline-none"
        />
      </div>

      {/* Global CSS to remove spinner/scrollbar for number input */}
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="absolute top-[40vh] left-43/64 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Fats(g)</h1>
      </div>
      <div
        // className={`absolute top-[40vh] left-20/32 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center border-3 ${
        //     isNumber(inputValueFat) && inputValueFat > 0 ? "border-blue-500" : "border-black"
        // }`}
        className={`absolute top-[40vh] left-20/32 transform -translate-x-1/2 w-[5vw] h-[5vw] rounded-full flex items-center justify-center border-2 ${
            isNumber(inputValueFat) && inputValueFat > 0 ? "border-blue-500" : "border-black"
        }`}
        
      >
        <input
          type="number"
          value={inputValueFat}
          onChange={handleInputChangeFat}
          className="w-24 h-24 bg-transparent text-black text-3xl text-center outline-none"
        />
      </div>

      {/* Global CSS to remove spinner/scrollbar for number input */}
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    

    <div className="absolute top-[70vh] left-[10vw] transform -translate-x-1/2 items-center justify-center text-center font-bold">
        <h1>Step 2: Restrictions</h1>
    </div> 

    <div className="absolute top-[75vh] left-2/8 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Avoid</h1>
    </div>   
    <div className="absolute top-[80vh] left-1/4 transform -translate-x-1/2 flex flex-wrap gap-1 justify-center items-center">
        {allergens.map((btn, index) => (
            <div key={index} className="relative">
            {/* Tooltip */}
            {hoveredIndexOne === index && (
                <div className="absolute -top-[5vh] left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow">
                {btn.tooltip}
                </div>
            )}

      {/* Button */}
      <button
        id={btn.tooltip}
        onClick={() => toggleAllergens(index)}
        onMouseEnter={() => setHoveredIndexOne(index)}
        onMouseLeave={() => setHoveredIndexOne(null)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-300 ${
          clickedOne[index] ? btn.color : "bg-black"
        }`}
      >
        {btn.letter}
      </button>
    </div>
  ))}
</div>

<div className="absolute top-[75vh] left-4/8 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Special Diet</h1>
    </div>  
<div className="absolute top-[80vh] left-1/2 transform -translate-x-1/2 flex flex-wrap gap-1 justify-center items-center">
  {diets.map((btn, index) => (
    <div key={index} className="relative">
      {/* Tooltip */}
      {hoveredIndexTwo === index && (
        <div className="absolute -top-[5vh] left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow">
          {btn.tooltip}
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => toggleClickTwo(index)}
        onMouseEnter={() => setHoveredIndexTwo(index)}
        onMouseLeave={() => setHoveredIndexTwo(null)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-300 ${
          clickedTwo[index] ? btn.color : "bg-black"
        }`}
      >
        {btn.letter}
      </button>
    </div>
  ))}
</div>

<div className="absolute top-[50vh] left-14/16 transform -translate-x-1/2 items-center justify-center text-center font-bold">
        <h1>Step 3</h1>
</div>

<div className="absolute top-[55vh] left-13/16 transform -translate-x-1/2 items-center justify-center text-center font-bold">
        <h1>Dining Hall<span className="text-red-500">*</span></h1>
</div>

<div className="absolute top-[55vh] left-15/16 transform -translate-x-1/2 items-center justify-center text-center font-bold">
        <h1>Meals<span className="text-red-500">*</span></h1>
</div>

<div className="absolute top-[60vh] left-13/16 -translate-x-1/2 flex flex-col space-y-2 items-center z-20">
  {meals.map((label, index) => (
    <Button
      key={index}
      onClick={() => handleClickMeal(index)}
      className={`w-22 h-10 flex items-center justify-center rounded-full text-white font-semibold transition-colors duration-300 px-1 py-3 ${clickedMeal === index ? "bg-blue-500" : "bg-gray-950"}`}
    >
      {label}
    </Button>
  ))}
</div>


 

<div className="absolute top-[60vh] left-15/16 -translate-x-1/2 flex flex-col space-y-2 items-center z-20">
  {dining_halls.map((label, index) => (
    <Button
      key={index}
      onClick={() => handleClickHall(index)}
      className={`w-22 h-10 flex items-center justify-center rounded-full text-white font-semibold transition-colors duration-300 ${clickedHall[index] ? "bg-blue-500" : "bg-gray-950"}`}
    >
      {label}
    </Button>
  ))}
    </div>

        <div className="fixed absolute top-[92vh] left-1/2 transform -translate-x-1/2">
            <Button
             disabled={!isFormValid} 
             className="w-20 h-10 flex items-center justify-center rounded-full text-white font-semibold">
                Submit
            </Button>
        </div>
    </div>
    );
  }
  