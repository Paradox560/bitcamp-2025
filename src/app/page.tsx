'use client'

import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { collection, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Montserrat, Jost, Nunito } from 'next/font/google'
import { ChevronRight, ChevronLeft } from 'lucide-react';
// import Navbar from './components/navbar';

// Proper font imports
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const jost = Jost({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  // State to control the translate value of the left arrow.
  const [arrowTranslateRight1, setArrowTranslateRight1] = useState('-300%');
  const [arrowTranslateLeft1, setArrowTranslateLeft1] = useState('200%');
  const [arrowTranslateRight2, setArrowTranslateRight2] = useState('-200%');
  const [arrowTranslateLeft2, setArrowTranslateLeft2] = useState('200%');

  const [centralOpacity, setCentralOpacity] = useState(0);

  const createUser = async () => {
    try {
      // Reference to the "users" collection
      const collectionRef = collection(db, 'users');
      // Document reference for the specific user using user id
      const docRef = doc(collectionRef, user?.id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log("User already exists in db.");
      } else {
        console.log("User does not exist in db. Creating a new user in db.");
  
        // Create the user document
        await setDoc(docRef, {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.primaryEmailAddress?.emailAddress,
          diningHall: "Yahentamitsi",
          meals: [],
          allergens: [],
          specialDiets: [],
          macros: {
            calories: 0,
            protein: "",
            fats: "",
            carbs: "",
          }
        });
    
        // Subcollection: Breakfast
        const breakfastRef = collection(docRef, 'Breakfast');
        await setDoc(doc(breakfastRef, 'Meal 1'), { created: true });
        await deleteDoc(doc(breakfastRef, 'Meal 1'));
  
        // Subcollection: Lunch
        const lunchRef = collection(docRef, 'Lunch');
        await setDoc(doc(lunchRef, 'Meal 1'), { created: true });
        await deleteDoc(doc(lunchRef, 'Meal 1'));
  
        // Subcollection: Dinner
        const dinnerRef = collection(docRef, 'Dinner');
        await setDoc(doc(dinnerRef, 'Meal 1'), { created: true });
        await deleteDoc(doc(dinnerRef, 'Meal 1'));
  
        console.log("User and meal subcollections created successfully.");
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  useEffect(() => {
    if(isSignedIn && isLoaded && user){
      createUser();
    } else {
      console.log("Parameters not met to create", isSignedIn, user);
    }
    // Trigger the slide-in animation shortly after mount.
    const timerArrow = setTimeout(() => {
      setArrowTranslateRight1('0%');
      setArrowTranslateLeft1('0%');
      setArrowTranslateRight2('0%');
      setArrowTranslateLeft2('0%');
    }, 100); // delay 100ms before animation

    const timerCentral = setTimeout(() => {
      setCentralOpacity(1);
    }, 1600); // delay 100ms before animation

    return () => {
      clearTimeout(timerArrow);
      clearTimeout(timerCentral);
    }

  }, [isSignedIn, isLoaded, user]);

  return (
    <div className="bg-[#E8F5E9] flex flex-col justify-center">
      {/* <Navbar/> */}
      <div className='mt-5'>
        <p className={`${montserrat.className} text-center text-2xl font-bold mb-2`}>
          WELCOME TO
        </p>
        <h1 className={`${jost.className} text-center text-6xl font-bold mb-2`}>
          MacroTerpitech
        </h1>
      </div>
      
      <div className='flex flex-row justify-evenly -mt-14'>
        <ChevronRight 
          style={{
            transform: `translateX(${arrowTranslateRight1})`,
            transition: 'transform 1500ms ease-in-out'
          }}
          className="h-[50vh] w-[100vw]" 
          strokeWidth={0.5} 
        />
        <ChevronRight 
          style={{
            transform: `translateX(${arrowTranslateRight2})`,
            transition: 'transform 1500ms ease-in-out'
          }}
          className="h-[50vh] w-[100vw]" 
          strokeWidth={0.5} 
        />
        
        <div 
          style={{
            opacity: centralOpacity,
            transition: 'opacity 1500ms ease-in-out'
          }}
          className="relative w-64 h-64 items-center p-20">
            <img
              src="/fork_knife.png"
              alt="Fork and Knife"
              className="absolute top-[12.5vh] left-1/200 object-contain z-0"
            />
            <img
              src="/plate.png"
              alt="Plate"
              className="absolute top-[15vh] left-1/12 w-40 h-40 object-contain z-10"
            />
        </div>
        
        {/* Animated Left Arrow */}
        <ChevronLeft
          style={{
            transform: `translateX(${arrowTranslateLeft1})`,
            transition: 'transform 1500ms ease-in-out'
          }}
          className="h-[50vh] w-[100vw]"
          strokeWidth={0.5}
        />
        <ChevronLeft
          style={{
            transform: `translateX(${arrowTranslateLeft2})`,
            transition: 'transform 1500ms ease-in-out'
          }}
          className="h-[50vh] w-[100vw]"
          strokeWidth={0.5}
        />
      </div>

      <div className='flex items-center justify-center -mt-14'>
        <SignedIn>
          <Button 
            asChild
            className="w-80 bg-[#E13318] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-800 transition duration-200 mb-10"
          >
            <Link href="/enter-info" className={nunito.className}>Set Your Goals!</Link>
          </Button>
        </SignedIn>
  
        <SignedOut>
          <Button 
            asChild
            className="w-80 bg-[#E13318] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-800 transition duration-200 mb-10"
          >
            <Link href="/sign-up" className={nunito.className}>Sign-up to get started!</Link>
          </Button>
        </SignedOut>
      </div>

      <div className="flex flex-row justify-evenly gap-4 px-4">
        <div className="bg-[#9CD3A0] opacity-85 rounded-lg shadow-md p-6 mb-6 w-133">
          <h2 className={`${montserrat.className} text-xl font-bold mb-4 text-black`}>How It Works:</h2>
          <ol className={`${nunito.className} list-decimal ml-5 space-y-2 text-black`}>
            <li>Enter your daily calorie and macro goals</li>
            <li>Set your preferences and dietary restrictions</li>
            <li>Get personalized meal recommendations from UMD dining halls</li>
            <li>Track your progress throughout the day</li>
          </ol>
        </div>
  
        <div className="bg-[#9CD3A0] opacity-85 rounded-lg shadow-md p-6 mb-6 w-133">
          <h2 className={`${montserrat.className} text-xl font-bold mb-4 text-black`}>Features:</h2>
          <div className={`${nunito.className} grid grid-cols-2 gap-4`}>
            <div className="flex flex-col items-center p-3 bg-[#E8F5E9] rounded-lg">
              <div className="text-2xl mb-2">🍽️</div>
              <div className="text-center font-medium text-sm">UMD Dining Hall Database</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-[#E8F5E9] rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-center font-medium text-sm">Macro Tracking</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-[#E8F5E9] rounded-lg">
              <div className="text-2xl mb-2">💻</div>
              <div className="text-center font-medium text-sm">Web App Planning</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-[#E8F5E9] rounded-lg">
              <div className="text-2xl mb-2">🔄</div>
              <div className="text-center font-medium text-sm">Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="bg-[#9CD3A0] opacity-85 rounded-lg shadow-md p-6 mb-6 mx-10">
        <h2 className={`${montserrat.className} text-xl font-bold mb-4 text-black`}>What Students Say:</h2>
        <div className={`${nunito.className} space-y-4`}>
          <div className="border-l-4 border-[#365A27] pl-4 py-1">
            <p className="italic text-black mb-2">
              &quot;This app has made it so much easier to eat healthy at UMD while still enjoying the food. I&apos;ve reached my fitness goals thanks to MacroTerpitech!&quot;
            </p>
            <p className="text-right font-medium text-sm text-gray-700">
              - Suvrath, Junior, Computer Science
            </p>
          </div>
          <div className="border-l-4 border-[#365A27] pl-4 py-1">
            <p className="italic text-black mb-2">
              &quot;As an athlete, I need to carefully track my nutrition. TerpMeals helps me find the right balance of protein and carbs at every dining hall.&quot;
            </p>
            <p className="text-right font-medium text-sm text-gray-700">
              - Michael, Sophomore, Kinesiology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

