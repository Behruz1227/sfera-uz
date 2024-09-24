import React from 'react';
import { FaInstagram, FaYoutube, FaTelegram, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import Images from '@/assets/ImgSend';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#16423C]  text-white py-6">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Footer Navigation */}
                    <div className="mb-6 md:mb-0">
                        <Image src={Images.Logo} className='my-3' alt="Hero image" width={200} />
                        {/* <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://" className="hover:underline">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="hover:underline">About Us</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:underline">Services</a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:underline">Contact</a>
                            </li>
                        </ul> */}
                    </div>

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a target='blank' href="https://youtube.com/itcityacademy/" className="hover:text-red-600">
                                <FaYoutube size={24} />
                            </a>
                            <a target='blank' href="https://www.youtube.com/@Itcity_academy" className="hover:text-blue-500">
                                <FaTelegram size={24} />
                            </a>
                            <a target='blank' href="https://www.instagram.com/itcity_academy/" className="hover:text-red-500">
                                <FaInstagram size={24} />
                            </a>
                            <a target='blank' href="https://tiktok.com/itcity_academy" className="hover:text-black">
                                <FaTiktok size={24} />
                            </a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        {/* <p className="text-sm">+998508890037</p> */}
                        <p className="text-sm">Qarshi Uzbekistan St</p>
                        <p className="text-sm"></p>
                        <p className="text-sm">Phone: (+998)50 889-00-37</p>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Sfera It Solotions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;