import React, { useState } from "react";

const FormAbout = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle email input changes
  const handleEmailChange = (event: { target: { value: any } }) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Check if the input matches the email regex
    setIsValidEmail(emailRegex.test(newEmail));
  };

  return (
    <div className="-ml-5 flex w-full flex-col justify-center">
      <p className="font-extralight text-[#BBBBBB]">Email Message</p>
      <textarea
        className="h-[182px] rounded-3xl border border-[#BBBBBB] p-4 font-bold text-black outline-none md:w-[480px]"
        placeholder="Type your message here..."
      />
      <p className="font-extralight text-[#BBBBBB]">Email Address</p>
      <div className="relative">
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          className={`h-[56px] w-full rounded-3xl border border-[#BBBBBB] p-4 font-bold text-black outline-none md:w-[480px]
            `}
          placeholder="youremail@example.com"
        />

        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-3 top-1/2 -mt-3 rounded-full"
        >
          <path
            d="M11.5 0.25C5.572 0.25 0.75 5.073 0.75 11C0.75 16.927 5.572 21.75 11.5 21.75C17.428 21.75 22.25 16.927 22.25 11C22.25 5.073 17.428 0.25 11.5 0.25ZM11.5 20.25C6.399 20.25 2.25 16.101 2.25 11C2.25 5.899 6.399 1.75 11.5 1.75C16.601 1.75 20.75 5.899 20.75 11C20.75 16.101 16.601 20.25 11.5 20.25ZM15.53 8.13599C15.823 8.42899 15.823 8.90402 15.53 9.19702L10.863 13.864C10.717 14.01 10.525 14.084 10.333 14.084C10.141 14.084 9.94901 14.011 9.80301 13.864L7.47 11.531C7.177 11.238 7.177 10.763 7.47 10.47C7.763 10.177 8.23801 10.177 8.53101 10.47L10.334 12.273L14.47 8.13702C14.763 7.84402 15.237 7.84399 15.53 8.13599Z"
            className={`${
              isValidEmail ? "fill-[#F79327]" : "fill-gray-500 opacity-50"
            }`}
          />
        </svg>
      </div>

    </div>
  );
};

export default FormAbout;
