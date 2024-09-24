import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { bgColor, bgColorBody, TitleTextColor } from './Colors';
import Button from './Button/Button';
import Image from 'next/image';
import Images from '@/assets/ImgSend';
import { FiLoader } from 'react-icons/fi'; // Import the loading icon from React-icons

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleScroll = () => {
        if (window.scrollY > 150) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLoginClick = () => {
        setIsLoading(true); // Set loading state to true when clicked
        // Simulate loading process
        setTimeout(() => {
            // Perform the actual login action here
            // Example: window.location.href = '/auth/login'; // For navigation
            setIsLoading(false); // Reset loading state after action
        }, 1000); // Simulate a slight delay
    };

    return (
        <div>
            <div className={`fixed w-full z-50 px-6 md:px-24 py-4 transition-all border-b-2 border-[#16423C] duration-500 ${isScrolled ? 'bg-[#16423C] border-[#16423C] shadow-md text-white' : `bg-[${bgColorBody}] border-[${bgColorBody}] shadow-md`}`}>
                <div className="flex justify-between items-center">
                    <div className={`text-${TitleTextColor} text-2xl md:text-3xl font-bold`}>
                        {!isScrolled && (
                            <div className={`${bgColor} ease-linear transition-all `}>
                                <Image
                                    src={Images.Logo1}
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                        {isScrolled && (
                            <div className={`${bgColor}`}>
                                <Image
                                    src={Images.Logo}
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <Link href="/auth/login" passHref>
                            <Button
                                size="large"
                                text={isLoading ? <FiLoader className="animate-spin text-white" /> : "Log-in"}
                                isScrolled={isScrolled}
                                onclick={handleLoginClick}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Full-Screen Loading Overlay */}
            {
                isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000">
                        <FiLoader className="animate-spin text-white text-4xl" />
                    </div>
                )
            }
        </div >
    );
}
