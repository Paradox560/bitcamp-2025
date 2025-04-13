"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Navbar from '../components/navbar';
import { Montserrat, Jost, Nunito} from 'next/font/google'

const montserrat = Montserrat({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  });
  
const jost = Jost({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

const nunito = Nunito({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export default function Page() {
    const [isSpinning1, setIsSpinning1] = useState(false);
    const [isSpinning2, setIsSpinning2] = useState(false);
    const [isSpinning3, setIsSpinning3] = useState(false);
    const [isSpinning4, setIsSpinning4] = useState(false);
    const [isSpinning5, setIsSpinning5] = useState(false);
    const [isSpinning6, setIsSpinning6] = useState(false);
    const [isSpinning7, setIsSpinning7] = useState(false);
    const [isSpinning8, setIsSpinning8] = useState(false);
    const [isSpinning9, setIsSpinning9] = useState(false);

    const handleRefreshClick1 = () => {
        // Start spinning
        setIsSpinning1(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning1(false);
        }, 1000);
    };
    const handleRefreshClick2 = () => {
        // Start spinning
        setIsSpinning2(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning2(false);
        }, 1000);
    };
    const handleRefreshClick3 = () => {
        // Start spinning
        setIsSpinning3(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning3(false);
        }, 1000);
    };
    const handleRefreshClick4 = () => {
        // Start spinning
        setIsSpinning4(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning4(false);
        }, 1000);
    };
    const handleRefreshClick5 = () => {
        // Start spinning
        setIsSpinning5(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning5(false);
        }, 1000);
    };
    const handleRefreshClick6 = () => {
        // Start spinning
        setIsSpinning6(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning6(false);
        }, 1000);
    };
    const handleRefreshClick7 = () => {
        // Start spinning
        setIsSpinning7(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning7(false);
        }, 1000);
    };
    const handleRefreshClick8 = () => {
        // Start spinning
        setIsSpinning8(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning8(false);
        }, 1000);
    };
    const handleRefreshClick9 = () => {
        // Start spinning
        setIsSpinning9(true);
        // Stop the spin after 1 second
        setTimeout(() => {
            setIsSpinning9(false);
        }, 1000);
    };
    return (
        <div className="bg-white">
            <div>
                <p className={`${montserrat.className} text-center text-2xl font-bold mb-2 mt-4`}>Your Curated Meals:</p>
            </div>

            <div className='bg-[#E8F5E9] p-4 rounded-md shadow mb-4 mx-10'>
                <p className={`${jost.className} text-center text-2xl font-bold mb-2`}>Breakfast:</p>
                <div className="flex flex-row justify-evenly gap-4">
                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className={montserrat.className}>Breakfast Meal 1</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick1}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning1 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>                            
                            <CardDescription className={nunito.className}>An amazing breakfast provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Dolly de Leon (born April 12, 1969) is a Filipino actress. De Leon began her career on stage, and made her film debut in Shake, Rattle & Roll III (1991). She was later cast in minor and uncredited roles in films and took on guest parts in television shows. Her breakthrough came in the crime drama Verdict (2019), for which she won a FAMAS Award for Best Supporting Actress. De Leon achieved international recognition and acclaim for her role in Triangle of Sadness (2022), winning the Guldbagge Award and the Los Angeles Film Critics Association Award for Best Supporting Performance, in addition to nominations for a Golden Globe Award and for a BAFTA Award for Best Supporting Actress; she became the first Filipino actress to be nominated for the latter two awards. De Leon co-founded Ladies Who Launch, a social services group that supports disadvantaged communities. British Vogue named her one of the 31 most famous stars in the world in 2023.</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className={montserrat.className}>Breakfast Meal 2</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick2}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning2 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>    
                            <CardDescription className={nunito.className}>An amazing breakfast provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="w-auto h-auto min-w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className={montserrat.className}>Breakfast Meal 3</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick3}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning3 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>    
                            <CardDescription className={nunito.className}>An amazing breakfast provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='bg-[#C7E6C9] p-4 rounded-md shadow mb-4 mx-10'>
                <p className={`${jost.className} text-center text-2xl font-bold mb-2`}>Lunch:</p>
                <div className="flex flex-row justify-evenly gap-4 ">
                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Lunch Meal 1</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick4}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning4 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>
                            <CardDescription className={nunito.className}>An amazing lunch provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Lunch Meal 2</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick5}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning5 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>
                            <CardDescription className={nunito.className}>An amazing lunch provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                        <div className="flex items-center justify-between">
                                <CardTitle>Lunch Meal 3</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick6}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning6 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>
                            <CardDescription className={nunito.className}>An amazing lunch provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='bg-[#ABD9AE] p-4 rounded-md shadow mb-4 mx-10'>
                <p className={`${jost.className} text-center text-2xl font-bold mb-2`}>Dinner:</p>
                <div className="flex flex-row justify-evenly gap-4">
                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Dinner Meal 1</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick7}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning7 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>
                            <CardDescription className={nunito.className}>An amazing dinner provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Dinner Meal 2</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick8}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning8 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>
                            <CardDescription className={nunito.className}>An amazing dinner provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px] bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Dinner Meal 3</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleRefreshClick9}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className={`${isSpinning9 ? 'animate-spin' : ''} h-5 w-5`}
                                    />
                                </Button>
                            </div>
                            <CardDescription className={nunito.className}>An amazing dinner provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className={`${nunito.className} flex-1 overflow-y-auto`}>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}