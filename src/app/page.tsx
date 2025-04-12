'use client'

import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Navbar from './components/navbar';

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  const createUser = async () => {
    try {
      const collectionRef = collection(db, 'users');
      const docRef = doc(collectionRef, user?.id);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        console.log("User already exists in db.");
      } else {
        console.log("User does not exist in db. Creating a new user in db.");

        // Add a new document with a generated id.
        await setDoc(docRef, {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.primaryEmailAddress?.emailAddress,
          diningHall: "Yahentamitsi",
          allergens: [],
          specialDiets: [],
        })
      }
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      console.error("Error adding user to db: " + message);
    }
  }

  useEffect(() => {
    if(isSignedIn && isLoaded && user){
      createUser();
    } else {
      console.log("Parameters not met to create" + isSignedIn + " " + user);
    }
  }, [isSignedIn, isLoaded, user]);

  return (
      <div className="bg-[#E8F5E9] flex flex-col justify-center">
          <Navbar/>
          <div className = 'mt-5'>
              <p className="text-center text-2xl font-bold mb-2">Welcome to</p>
              <p className="text-center text-5xl font-bold mb-2">TEMP WEBSITE NAME</p>
          </div>
          <div className='flex flex-row justify-evenly -mt-14'>
              <ChevronRight className="h-[50vh] w-[100vw]" strokeWidth={0.5}/>
              <ChevronRight className="h-[50vh] w-[100vw]" strokeWidth={0.5}/>
              <div className="relative w-64 h-64 items-center p-20">
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
              <ChevronLeft className="h-[50vh] w-[100vw]" strokeWidth={0.5}/>
              <ChevronLeft className="h-[50vh] w-[100vw]" strokeWidth={0.5}/>
          </div>

          <div className='flex items-center justify-center -mt-14'>
            <SignedIn>
              <Button 
                asChild
                className="w-80 bg-[#E13318] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-800 transition duration-200 mb-10"
              >
                <Link href="/enter-info">Set Your Goals!</Link>
              </Button>
            </SignedIn>
      
            <SignedOut>
              <Button 
                asChild
                className="w-80 bg-[#E13318] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-800 transition duration-200 mb-10"
              >
                <Link href="/sign-up">Sign-up to get started!</Link>
              </Button>
            </SignedOut>
          </div>

          <div className="flex flex-row justify-evenly gap-4 px-4">
              <div className="bg-[#B1E7B6] opacity-85 rounded-lg shadow-md p-6 mb-6 w-133">
                  <h2 className="text-xl font-bold mb-4 text-black">How It Works</h2>
                  <ol className="list-decimal ml-5 space-y-2 text-black">
                      <li>Enter your daily calorie and macro goals</li>
                      <li>Set your preferences and dietary restrictions</li>
                      <li>Get personalized meal recommendations from UMD dining halls</li>
                      <li>Track your progress throughout the day</li>
                  </ol>
              </div>
        
              <div className="bg-[#B1E7B6] opacity-85 rounded-lg shadow-md p-6 mb-6 w-133">
                  <h2 className="text-xl font-bold mb-4 text-black">Features</h2>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <div className="text-2xl mb-2">🍽️</div>
                          <div className="text-center font-medium text-sm">UMD Dining Hall Database</div>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <div className="text-2xl mb-2">📊</div>
                          <div className="text-center font-medium text-sm">Macro Tracking</div>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <div className="text-2xl mb-2">💻</div>
                          <div className="text-center font-medium text-sm">Web App Planning</div>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <div className="text-2xl mb-2">🔄</div>
                          <div className="text-center font-medium text-sm">Real-time Updates</div>
                      </div>
                  </div>
              </div>
          </div>
        
          <div className="bg-[#B1E7B6] opacity-85 rounded-lg shadow-md p-6 mb-6 mx-10">
              <h2 className="text-xl font-bold mb-4 text-black">What Students Say</h2>
              <div className="space-y-4">
              <div className="border-l-4 border-[#365A27] pl-4 py-1">
                  <p className="italic text-black mb-2">
                  &quot;This app has made it so much easier to eat healthy at UMD while still enjoying the food. I&apos;ve reached my fitness goals thanks to TerpMeals!&quot;
                  </p>
                  <p className="text-right font-medium text-sm text-gray-700">
                  - Sarah, Junior, Computer Science
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