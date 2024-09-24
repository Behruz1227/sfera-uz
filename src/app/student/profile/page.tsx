"use client";
import React, { useEffect, useState } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { useGet } from "@/context/globalFunctions/useGetOption"; // Fetch getResponse data from context or API
import { BackgroundLines } from "@/components/ui/background-lines";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { bgColorBody } from "@/components/Colors";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEdit } from "@/context/globalFunctions/useEditOption";
import { File, get_mee, Update_me } from "@/context/api/api";
import toast from "react-hot-toast";
import { Label } from "@radix-ui/react-label";
import { config } from "@/context/api/token";
import ImageUpload from "@/components/imgUpload/imgUpload";
import useMeeStore from "@/context/state-management/getMeeStore/getMeeStore";
import {LabelInputContainer} from "@/components/Text/LabelInputContainer";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {imgUpload} = useMeeStore();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    isPasswordVisible: false,
    firstNameError: "",
    lastNameError: "",
    phoneError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const { editData, response } = useEdit(
    `${Update_me}${imgUpload && imgUpload !== 0 ? "?fileId=" + imgUpload : ""}`,
    {
      lastName: formData.lastName,
      firstName: formData.firstName,
      phoneNumber: `998${formData.phoneNumber}`,
      password: formData.password,
    },
    config
  );
  const {
    getData,
    data: getResponse,
  } = useGet(
    `${get_mee}`, config);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    async function check() {
      // response mavjudligini tekshirish
      if (response) {
        // Promise ni async ichida to'g'ridan-to'g'ri ishlatish
        await new Promise((res) => {
          localStorage.clear();
          localStorage.setItem("token", response?.token);
          localStorage.setItem("role", response?.role);
          res("salom"); // Promise'ni hal qilish
        });

        // Token va rol set qilingandan keyin, keyingi amallar ketma-ket ishlaydi
        await getData();
        await handleEditToggle();
        await window.location.reload()
      }
    }

    check(); // check funktsiyasini chaqirish
  }, [response]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // setFormData({ ...user, password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 9) {
        setFormData((prev) => ({
          ...prev,
          phoneNumber: numericValue,
          phoneError:
            numericValue.length !== 9
              ? "Phone number must be exactly 9 digits."
              : "",
        }));
      }
    }
    if (id === "firstName") {
      setFormData((prev) => ({
        ...prev,
        firstName: value,
        firstNameError: value.trim() === "" ? "First name is required." : "",
      }));
    }

    if (id === "lastName") {
      setFormData((prev) => ({
        ...prev,
        lastName: value,
        lastNameError: value.trim() === "" ? "Last name is required." : "",
      }));
    }
    // Handle password validation
    if (id === "password") {
      setFormData((prev) => ({
        ...prev,
        password: value,
        passwordError:
          value.length < 5
            ? "Password must be at least 5 characters long."
            : "",
        confirmPasswordError:
          value === formData.confirmPassword ? "" : "Passwords do not match.", // Check if passwords match
      }));
    }

    if (id === "confirmPassword") {
      setFormData((prev) => ({
        ...prev,
        confirmPassword: value,
        confirmPasswordError:
          value === formData.password ? "" : "Passwords do not match.", // Check if passwords match
      }));
    }
  };

  const handlePasswordToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));
  };

  const handleSubmit = async () => {
    if (
      formData.phoneNumber.length === 9 &&
      formData.password.length >= 5 &&
      formData.password === formData.confirmPassword
    ) {
      try {
        console.log("Updated Profile:", {
          lastName: formData.lastName,
          firstName: formData.firstName,
          phoneNumber: `998${formData.phoneNumber}`,
          password: formData.password,
        });
        await editData();
        response && toast.success("Malumotlarigiz yangilandi!");

        setFormData({
          phoneNumber: "",
          lastName: "",
          firstName: "",
          password: "",
          confirmPassword: "",
          isPasswordVisible: false,
          firstNameError: "",
          lastNameError: "",
          phoneError: "",
          passwordError: "",
          confirmPasswordError: "",
        });
      } catch (err) {
        // Handle error
      }
    } else if (formData.password !== formData.confirmPassword) {
      setFormData((prev) => ({
        ...prev,
        confirmPasswordError: "Passwords do not match.",
      }));
    }
  };

  return (
    <SidebarDemo>
      <title>Sfera uz | Profil</title>
      <BackgroundLines className="flex items-center justify-center overflow-hidden w-full flex-col">
        <BackgroundGradient className="overflow-hidden w-[400px] rounded-2xl dark:bg-zinc-900">
          <div className="relative z-10 p-6 rounded-lg shadow-lg bg-[#6A9C89] max-w-full">
            <h1
              className={`text-2xl font-bold text-[${bgColorBody}] dark:text-white text-center`}
            >
              Profile
            </h1>
            {!isEditing ? (
              <div className="mt-6 w-full flex justify-center items-center flex-col">
                <div className="flex items-center justify-center mt-4">
                  <img
                    src={getResponse?.fileId && getResponse?.fileId !== 0  ? File + getResponse?.fileId : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"} // Placeholder for user image
                    alt="User Profile"
                    className="w-24 h-24 rounded-full border-4 border-[#16423C]"
                  />
                </div>
                <p
                  className={`text-xl font-semibold text-[${bgColorBody}] dark:text-white`}
                >
                  {getResponse?.firstName} {getResponse?.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getResponse?.phoneNumber}
                </p>
                <button
                  onClick={handleEditToggle}
                  className="mt-4 w-full py-2 bg-[#16423C] text-white font-semibold rounded-lg hover:bg-[#5a8b7a] transition-all duration-200"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center mt-4">
                    <ImageUpload imgID={getResponse?.fileId} />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    First Name
                  </label>

                  <Input
                    id="firstName"
                    placeholder="First Name"
                    type="text"
                    value={response?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="First Name"
                    type="text"
                    value={response?.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      placeholder=" -- --- --"
                      type="text"
                      value={response?.phoneNumber}
                      onChange={handleChange}
                      maxLength={12} // Allow space for +998 and dashes
                      className="pl-[3rem]"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 left-0 flex items-center pl-3"
                      onClick={handleSubmit}
                    >
                      +998
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="•••••"
                      type={formData.isPasswordVisible ? "text" : "password"}
                      value={response?.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={handlePasswordToggle}
                    >
                      {formData.isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <LabelInputContainer className="md:mb-4 mb-2">
                  <Label
                    className="text-white font-semibold"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="•••••"
                      type={formData.isPasswordVisible ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {formData.confirmPasswordError && (
                    <p className="text-red-500 text-sm mt-1">
                      {formData.confirmPasswordError}
                    </p>
                  )}
                </LabelInputContainer>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="mt-4 w-[48%] py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="mt-4 w-[48%] py-2 bg-[#16423C] text-white font-semibold rounded-lg hover:bg-[#5a8b7a] transition-all duration-200"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </BackgroundGradient>
      </BackgroundLines>
    </SidebarDemo>
  );
};

export default Profile;
