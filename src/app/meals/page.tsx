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

export default function Page() {
    return (
        <div className="bg-[#D56C6C]">
            <div>
                <p className="text-center text-2xl font-bold mb-2">Your Curated Meals:</p>
            </div>

            <div className='bg-[#FDEDD6] p-4 rounded-md shadow mb-4 ml-4 mr-4'>
                <p className="text-center text-2xl font-bold mb-2">Breakfast:</p>
                <div className="flex flex-row justify-evenly gap-4">
                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Breakfast Meal 1</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>                            
                            <CardDescription>An amazing breakfast provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto">
                            <p>Dolly de Leon (born April 12, 1969) is a Filipino actress. De Leon began her career on stage, and made her film debut in Shake, Rattle & Roll III (1991). She was later cast in minor and uncredited roles in films and took on guest parts in television shows. Her breakthrough came in the crime drama Verdict (2019), for which she won a FAMAS Award for Best Supporting Actress. De Leon achieved international recognition and acclaim for her role in Triangle of Sadness (2022), winning the Guldbagge Award and the Los Angeles Film Critics Association Award for Best Supporting Performance, in addition to nominations for a Golden Globe Award and for a BAFTA Award for Best Supporting Actress; she became the first Filipino actress to be nominated for the latter two awards. De Leon co-founded Ladies Who Launch, a social services group that supports disadvantaged communities. British Vogue named her one of the 31 most famous stars in the world in 2023.</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Breakfast Meal 2</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>    
                            <CardDescription>An amazing breakfast provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto">
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="w-auto h-auto min-w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Breakfast Meal 3</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>    
                            <CardDescription>An amazing breakfast provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto">
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='bg-[#FDEDD6] p-4 rounded-md shadow mb-4 ml-4 mr-4'>
                <p className="text-center text-2xl font-bold mb-2">Lunch:</p>
                <div className="flex flex-row justify-evenly gap-4 ">
                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Lunch Meal 1</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>
                            <CardDescription>An amazing lunch provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Lunch Meal 2</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>
                            <CardDescription>An amazing lunch provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                        <div className="flex items-center justify-between">
                                <CardTitle>Lunch Meal 3</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>
                            <CardDescription>An amazing lunch provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='bg-[#FDEDD6] p-4 rounded-md shadow ml-4 mr-4'>
                <p className="text-center text-2xl font-bold mb-2">Dinner:</p>
                <div className="flex flex-row justify-evenly gap-4">
                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Dinner Meal 1</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>
                            <CardDescription>An amazing dinner provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Dinner Meal 1</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>
                            <CardDescription>An amazing dinner provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px] w-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Dinner Meal 1</CardTitle>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=59872&format=png&color=000000"
                                        alt="Refresh"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </div>
                            <CardDescription>An amazing dinner provided by our very own Yahentamitsi Dining Hall!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}