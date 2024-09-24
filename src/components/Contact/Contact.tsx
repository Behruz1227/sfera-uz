import Images from '@/assets/ImgSend';
import React, { useState } from 'react';
import HeaderTitles from '../Text/HeadText';
import Image from 'next/image';
import { Input } from '../ui/input';
import { usePost } from '@/context/globalFunctions/usePostOption';
import { contactUs } from '@/context/api/api';
import toast from 'react-hot-toast';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
        phone: '+998',
    });
    const [error, setError] = useState<string | null>(null);
    const { loading, error: apiError, postData } = usePost(
        contactUs,
        {
            name: formData.name,
            message: formData.message,
            phone: formData.phone.replace('+', ''),
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { name, message, phone } = formData;
        if (!name || !message || !phone) {
            setError('All fields are required.');
            return;
        }

        setError(null);

        try {
            await postData(); 
            toast.success('Message sent successfully!');
            setFormData({
                name: '',
                message: '',
                phone: '+998',
            });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="flex lg:flex-row items-center text-white lg:justify-between gap-3 flex-col p-6 bg-[#6A9C89] rounded-xl my-2">
            <div className="w-full mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {apiError && <div className="text-red-500 mb-4">API Error: {apiError.message}</div>}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-medium">Name</label>
                        <Input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-2 font-medium">Phone</label>
                        <Input
                            type="number"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message" className="mb-2 font-medium">Message</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-[20px] flex items-center justify-center rounded bg-[#C4DAD2] text-white border px-6 pb-2 mt-4"
                        disabled={loading} // Disable button while loading
                    >
                        <HeaderTitles size="text-sm" text={loading ? 'Sending...' : 'Send Message'} />
                    </button>
                </form>
            </div>
            <div className="w-full mx-auto lg:p-10">
                <Image className="rounded-lg" src={Images.ContactuS} alt="Hero image" width={400} height={400} />
            </div>
        </div>
    );
};

export default ContactUs;