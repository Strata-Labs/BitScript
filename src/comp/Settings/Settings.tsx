import Link from "next/link";

const Settings = () => {
  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5">
      <div className="flex flex-col text-[#6C5E70]">
        <div className="flex items-center">
          {/* Left pointing icon link */}
          <Link className="cursor-pointer" href={"/profile"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              rotate="180deg"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <g transform="rotate(180 12 12)">
                <path
                  d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                  fill="#F79327"
                />
              </g>
            </svg>
          </Link>
          <p className="ml-3 text-[28px] text-black">All Settings</p>
        </div>
        <p className="mt-10 font-extralight">
          Below you’ll find your profile & payment information. Click into any
          area to edit & save .
        </p>
        <div className="mt-5 flex flex-col rounded-xl bg-white p-5">
          <p className="text-black">Profile Settings</p>
          <div className="mt-10 flex flex-col justify-between md:flex-row">
            <div className="mr-5 flex w-full flex-col">
              <p className="font-extralight">Email</p>
              <input
                type="text"
                placeholder="Email"
                className="border-gray mt-2 rounded-full border p-2 pl-3"
              />
            </div>
            <div className="mt-3 flex w-full flex-col md:mt-0">
              <p className="font-extralight">Password</p>
              <input
                type="text"
                placeholder="Password"
                className="border-gray mt-2 rounded-full border p-2 pl-3"
              />
            </div>
          </div>
          <Link
            className="mt-5 font-extralight text-[#6C5E70] underline"
            href={""}
          >
            reset password
          </Link>
        </div>
        <div className="mt-5 flex flex-col rounded-xl bg-white p-5">
          <div className="flex flex-col justify-between md:flex-row">
            <p className="text-[#0C071D]">Payment Settings</p>
            <p className="mt-3 font-extralight text-[#0C071D] md:mt-0">
              subscribed since{" "}
              <span className="font-semibold">Jan 10th, 23’</span> | next
              payment <span className="font-semibold">Nov. 10th, 23’</span>
            </p>
          </div>

          <div className="mt-10 flex justify-between">
            <div className="mr-5 flex w-full flex-col">
              <p className="font-extralight">Cancel subscription</p>
              <button className="border-gray mt-2 h-[48px] w-[300px] items-start rounded-full border pl-5 text-left font-extralight lg:w-[555px]">
                Click to cancel
              </button>
            </div>
          </div>
          <Link
            className="mt-5 font-extralight text-[#6C5E70] underline"
            href={""}
          >
            reset password
          </Link>
        </div>
        <div className="mr-5 mt-5 flex w-full flex-col">
          <p className="font-semibold">
            Logging somewhere else?{" "}
            <span className="font-extralight">(max of 2 IPs per account)</span>
          </p>
          <button className="border-gray mt-2 h-[48px] w-[300px] items-start rounded-full border pl-5 text-left font-extralight lg:w-[555px]">
            Click to Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
