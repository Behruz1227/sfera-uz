"use client"
import { BiSolidImageAdd } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { usePost } from '@/context/globalFunctions/usePostOption';
import useMeeStore from '@/context/state-management/getMeeStore/getMeeStore';
import { consoleClear } from '@/context/api/toastMessage';
import { config } from '@/context/api/token';
import { File, FileAdd } from '@/context/api/api';

interface ImageUploadProps {
    imgID?: string | number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imgID }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);
    const { setImgUpload } = useMeeStore();
    const { loading: imgLoading, response: imgResponse, postData } = usePost(FileAdd, formData, config);

    useEffect(() => {
        if (imgResponse) {
            setImgUpload(imgResponse);
            consoleClear();
        }
    }, [imgResponse, setImgUpload]);

    useEffect(() => {
        if (formData) {
            postData();
        }
    }, [formData, postData]);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setFormData(formData);

            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setSelectedImage(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-40 h-28 bg-lighterGreen rounded-lg p-4">
            <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
            >
                {imgLoading ? (
                    <span className="text-black font-semibold text-base">Yuklanmoqda...</span>
                ) : (selectedImage || imgID) ? (
                    <img
                        src={selectedImage ? selectedImage : imgID && imgID !== 0 ? File + imgID : 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'}
                        alt="Selected"
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#16423C]"
                    />
                ) : (
                    <div className="text-whiteGreen text-center">
                        <div className={`flex justify-center items-center`}>
                            <BiSolidImageAdd className={`text-7xl`} />
                        </div>
                        <span className="font-semibold text-base">Rasm yuklash</span>
                    </div>
                )}
            </label>
            <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;
