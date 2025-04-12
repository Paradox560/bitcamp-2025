'use client'

import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Parisienne, Marck_Script } from "next/font/google";

// Proper font imports
const parisienne = Parisienne({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const marck_Script = Marck_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
    <div className="min-h-screen w-full bg-[#860F09]">
      <h1 className={`${parisienne.className} text-8xl pt-8 ml-7 w-fit text-[#FDEDD6] border-b-[0.15rem] border-white`}>
        Welcome to MacroTerpitect
      </h1>
      <h2 className={`${marck_Script.className} text-5xl ml-10 mt-3 text-[#FDEDD6]`}>
        Your Next Best Meal Preparation App
      </h2>

      <SignedIn>
        <p className='text-2xl ml-[3%] mt-[5%] w-3/5 text-[#FDEDD6] font-light'>
          Yada Yada Yada does something probably
        </p>
        <Button 
          asChild
          className='ml-[3%] mt-[6%] w-44 h-18 bg-[#B37238] text-[#FDEDD6] text-2xl font-normal hover:bg-[#9c632f]'
        >
          <Link href="/home">Home</Link>
        </Button>
      </SignedIn>
      
      <SignedOut>
        <p className='text-2xl ml-[3%] mt-[5%] w-3/5 text-[#FDEDD6] font-light'>
          Longer description of the app goes here
        </p>
        <Button 
          asChild
          className='ml-[3%] mt-[6%] w-44 h-18 bg-[#B37238] text-[#FDEDD6] text-2xl font-normal hover:bg-[#9c632f]'
        >
          <Link href="/sign-in">Log In</Link>
        </Button>
      </SignedOut>
    </div>
  );
}