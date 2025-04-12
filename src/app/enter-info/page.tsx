'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react";

const allergens = [
    { letter: "D", color: "bg-blue-500", tooltip: "Dairy" },
    { letter: "E", color: "bg-yellow-500", tooltip: "Eggs" },
    { letter: "S", color: "bg-lime-500", tooltip: "Soy" },
    { letter: "G", color: "bg-amber-500", tooltip: "Gluten" },
    { letter: "N", color: "bg-red-500", tooltip: "Nuts" },
    { letter: "SS", color: "bg-orange-500", tooltip: "Sesame" },
    { letter: "F", color: "bg-pink-500", tooltip: "Fish" },
    { letter: "SF", color: "bg-teal-500", tooltip: "Shellfish" },
  ];

const diets = [
    { letter: "V", color: "bg-emerald-800", tooltip: "Vegetarian" },
    { letter: "VG", color: "bg-purple-500", tooltip: "Vegan" },
    { letter: "HF", color: "bg-cyan-500", tooltip: "Halal Friendly" },
  ];

const meals = ["Breakfast", "Lunch", "Dinner"]
const dining_halls = ["Yahentamitsi", "251", "South"]




export default function EnterInformation() {

    const [inputValueOne, setInputValueOne] = useState("");
    const [inputValueTwo, setInputValueTwo] = useState("");
    const [inputValueThree, setInputValueThree] = useState("");
    const [inputValueFour, setInputValueFour] = useState("");

    
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

  // Handle input change
  const handleInputChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueOne(e.target.value);
  };

  const handleInputChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueTwo(e.target.value);
  };

  const handleInputChangeThree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueThree(e.target.value);
  };

  const handleInputChangeFour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueFour(e.target.value);
  };


  const handleClickMeal = (index: number) => {
    // const updatedClicked = [...clickedMeal];
    // updatedClicked[index] = !updatedClicked[index];
    // console.log("hi");
    // setClickedMeal(updatedClicked);
    setClickedMeal(clickedMeal === index ? null : index);
  };


  const handleClickHall = (index: number) => {
    const updatedClickedHall = [...clickedHall];
    updatedClickedHall[index] = !updatedClickedHall[index];

    setClickedHall(updatedClickedHall);
  };

    return (
    <div>
      <div className="absolute top-[8vh] left-1/2 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Please enter the following information</h1>
      </div>
      <br></br>
      <div className="absolute top-[15vh] left-1/2 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Calories</h1>
      </div>

      <div className="absolute top-[15vh] left-[10vw] transform -translate-x-1/2 items-center justify-center text-center font-bold">
        <h1>Step 1: Macros</h1>
      </div>
      {/* Circle with fixed background color and dynamic border color */}
      <div
        className={`absolute top-[20vh] left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full flex items-center justify-center border-8 z-10 ${
          inputValueOne.trim() ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="text"
          value={inputValueOne}
          onChange={handleInputChangeOne}
          className="text-center w-48 bg-transparent text-black outline-none text-3xl"
        />
      </div>

      <div className="absolute top-[32vh] left-1/4 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Protein(g)</h1>
      </div>
      <div
        className={`absolute top-[36vh] left-1/4 transform -translate-x-1/2 w-30 h-30 rounded-full flex items-center justify-center border-6 z-10 ${
          inputValueTwo.trim() ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="text"
          value={inputValueTwo}
          onChange={handleInputChangeTwo}
          className="text-center w-48 bg-transparent text-black outline-none text-3xl"
        />
      </div>


      <div className="absolute top-[22vh] left-13/16 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Carbs(g)</h1>
      </div>
      <div
        className={`absolute top-[22vh] left-3/4 transform -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center border-8 ${
          inputValueThree.trim() ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="text"
          value={inputValueThree}
          onChange={handleInputChangeThree}
          className="text-center w-48 bg-transparent text-black outline-none text-2xl"
        />
      </div>

      <div className="absolute top-[22vh] left-13/16 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Carbs(g)</h1>
      </div>
      <div
        className={`absolute top-[22vh] left-3/4 transform -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center border-4 ${
          inputValueThree.trim() ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="text"
          value={inputValueThree}
          onChange={handleInputChangeThree}
          className="text-center w-48 bg-transparent text-black outline-none text-2xl"
        />
      </div>


      <div className="absolute top-[40vh] left-43/64 transform -translate-x-1/2 items-center justify-center text-center">
        <h1>Fats(g)</h1>
      </div>
      <div
        className={`absolute top-[40vh] left-20/32 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center border-2 ${
          inputValueFour.trim() ? "border-blue-500" : "border-black"
        }`}
      >
        <input
          type="text"
          value={inputValueFour}
          onChange={handleInputChangeFour}
          className="text-center w-48 bg-transparent text-black outline-none text-2xl"
        />
      </div>
    

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
        onClick={() => toggleClickOne(index)}
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
        <h1>Step 3: Meal and Dining Halls</h1>
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
        <Button className="w-20 h-10 flex items-center justify-center rounded-full text-white font-semibold">Submit</Button>
    </div>
      
    </div>
    );



  }
  