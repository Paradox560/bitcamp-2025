"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Toaster, toast } from "sonner";
import Loading from "@/app/components/loading";

const allergens = [
  { letter: "D", color: "bg-blue-500", tooltip: "Dairy" },
  { letter: "E", color: "bg-yellow-500", tooltip: "Egg" },
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
  { letter: "HF", color: "bg-cyan-500", tooltip: "HalalFriendly" },
];

interface Food {
  name: string;
  servingSize: string;
  calories: number;
  fats: number;
  carbs: number;
  protein: number;
}

interface FoodList {
  meal: string;
  ingredients: Food[];
}

const systemPrompt = `You are a nutritionist and a culinary master. You are given a list of foods that your client can eat, 
and each item in the list contains the food name, the serving size, the calories per serving, the fat per serving, the carbs
per serving, and the protein per serving. Please create 1 meal from this given food list. You should calculate the total calories,
total fat, total carbs, and the total protein of the meal based on the number of servings you’re recommending and the calories, fat,
carbs, and protein per serving. You should create a name for this meal, a one sentence description, and specify each food you used
in the meal, and the serving size, total calories, fat, carbs, and protein. We will also give you the number of calories, fat, carbs,
and protein the user wants to eat for this meal. Please make your meal’s total calories, fat, carbs, and protein come as close to
possible as what the user wants to eat with it serving as a lower bound. Please limit yourself to only using a maximum of 7 ingredients.
For each food, specify how many calories, fat, carbs, and protein the total serving. You should return in the following JSON format:
{
  info: [{
    “name”: str,
    “description”: str
    “total_calories”: number
    “total_fat”: number
    “total_carbs”: number
    “total_fat”: number,
    foods: [
      {"food_name": str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number},
      {food_name: str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number},
      {"food_name": str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number},
      {"food_name": str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number},
      {"food_name": str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number},
      {"food_name": str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number},
      {"food_name": str,
      “serving_size”: str
      “calories”: number
      “fat”: number
      “carbs”: number
      “protein”: number}
    ]
  ]
}`;

/*Switched them around to save time instead of actually switching them */
const dining_halls = ["Breakfast", "Lunch", "Dinner"];
const meals = ["Yahentamitsi", "251", "South"];

export default function EnterInformation() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const maxValue = 9999; // Define the max value for the input

  const [inputValueCalories, setinputValueCalories] = useState<number | string>(0); // Allow number or string (for empty input)
  const [inputValueProtein, setinputValueProtein] = useState<number | string>(0); // Allow number or string (for empty input)
  const [inputValueCarbs, setinputValueCarbs] = useState<number | string>(0); // Allow number or string (for empty input)
  const [inputValueFat, setinputValueFat] = useState<number | string>(0); // Allow number or string (for empty input)

  const [clickedOne, setClickedOne] = useState(Array(8).fill(false));
  const [hoveredIndexOne, setHoveredIndexOne] = useState<number | null>(null);
  const [clickedTwo, setClickedTwo] = useState(Array(3).fill(false));
  const [hoveredIndexTwo, setHoveredIndexTwo] = useState<number | null>(null);

  /*Meal selection*/
  const [clickedMeal, setClickedMeal] = useState<number | null>(null);

  /*Dining hall*/
  const [clickedHall, setClickedHall] = useState([false, false, false]);

  const [caloriesSelected, setcaloriesSelected] = useState<string>("");
  const [hallSelected, setHallSelected] = useState<string>("");
  const [mealSelected, setMealSelected] = useState<string>("");

  const isFormValid = caloriesSelected !== "" && hallSelected !== "" && mealSelected !== "";

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

  const handleInputChangeCalories = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === "") {
      setinputValueCalories("");
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        if (parsedValue <= maxValue) {
          setinputValueCalories(parsedValue);
        }
      }

      setcaloriesSelected("valid");
    }
  };

  const handleInputChangeProtein = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setinputValueProtein("");
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        if (parsedValue <= maxValue) {
          setinputValueProtein(parsedValue);
        }
      }
    }
  };

  const handleInputChangeCarbs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setinputValueCarbs("");
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        if (parsedValue <= maxValue) {
          setinputValueCarbs(parsedValue);
        }
      }
    }
  };

  const handleInputChangeFat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setinputValueFat("");
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        if (parsedValue <= maxValue) {
          setinputValueFat(parsedValue);
        }
      }
    }
  };

  const handleClickMeal = (index: number) => {
    setClickedMeal(clickedMeal === index ? null : index);
    setMealSelected("valid");
  };

  const handleClickHall = (index: number) => {
    const updatedClickedHall = [...clickedHall];
    updatedClickedHall[index] = !updatedClickedHall[index];
    setClickedHall(updatedClickedHall);
    setHallSelected("valid");
  };

  const isNumber = (value: number | string): value is number => {
    return typeof value === "number";
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      // Use Sonner toast instead of alert
      toast.error("You must be logged in to save your macros");
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", user.id);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document not found in database");
      }

      const updatedMacros = {
        calories: inputValueCalories,
        protein: inputValueProtein,
        fats: inputValueFat,
        carbs: inputValueCarbs,
      };

      await updateDoc(userDocRef, {
        macros: updatedMacros,
      });

      // Use Sonner toast instead of alert
      toast.success("Your macros have been updated successfully!");

      const selectedAllergens = allergens
        .filter((_, index) => clickedOne[index])
        .map((allergen) => allergen.tooltip);

      const selectedDiets = diets
        .filter((_, index) => clickedTwo[index])
        .map((diet) => diet.tooltip);

      const selectedDiningHall =
        clickedHall.findIndex((selected) => selected) !== -1
          ? dining_halls[clickedHall.findIndex((selected) => selected)]
          : null;

      const selectedMeal = clickedMeal !== null ? meals[clickedMeal] : null;

      await updateDoc(userDocRef, {
        allergens: selectedAllergens,
        specialDiets: selectedDiets,
        diningHall: selectedDiningHall || "Yahentamitsi",
      });

      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      // Use Sonner toast instead of alert
      toast.error("Failed to update your information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.id) return;

      try {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.macros) {
            setinputValueCalories(userData.macros.calories || 0);
            setinputValueProtein(userData.macros.protein || 0);
            setinputValueCarbs(userData.macros.carbs || 0);
            setinputValueFat(userData.macros.fats || 0);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [user?.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Add Toaster component to render toast notifications */}
      <Toaster position="top-center" />

      {/* Rest of your UI remains the same */}
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
          max={maxValue}
          step="1"
          className="w-24 h-24 bg-transparent text-black text-3xl text-center outline-none"
        />
      </div>

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
            {hoveredIndexOne === index && (
              <div className="absolute -top-[5vh] left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow">
                {btn.tooltip}
              </div>
            )}
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
            {hoveredIndexTwo === index && (
              <div className="absolute -top-[5vh] left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow">
                {btn.tooltip}
              </div>
            )}
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
        <h1>Step 3: Dining Hall and Meals</h1>
      </div>

      <div className="absolute top-[60vh] left-13/16 -translate-x-1/2 flex flex-col space-y-2 items-center z-20">
        {meals.map((label, index) => (
          <Button
            key={index}
            onClick={() => handleClickMeal(index)}
            className={`w-30 h-10 flex items-center justify-center rounded text-white font-semibold transition-colors duration-300 px-1 py-3 ${
              clickedMeal === index ? "bg-blue-500" : "bg-gray-950"
            }`}
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
            className={`w-30 h-10 flex items-center justify-center rounded text-white font-semibold transition-colors duration-300 ${
              clickedHall[index] ? "bg-blue-500" : "bg-gray-950"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="fixed absolute top-[92vh] left-1/2 transform -translate-x-1/2">
        <Button
          disabled={!isFormValid} 
          onClick={handleSubmit}
          className="w-20 h-10 flex items-center justify-center rounded-full text-white font-semibold"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
