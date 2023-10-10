const FormAbout = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-[#BBBBBB]">Email Message</p>
      <textarea
        rows={4}
        className="h-[182px] w-[350px] resize-none rounded-3xl border border-[#BBBBBB] p-4 outline-none md:w-[480px]"
        placeholder="type your message here..."
      ></textarea>
      <p className="mt-5 font-semibold text-[#BBBBBB]">Email Address</p>
      <div className="relative md:w-[480px]">
        <input
          type="text"
          className="h-[56px] w-full rounded-full border border-[#BBBBBB] p-4 outline-none"
          placeholder="youremail@example.com"
        />
        <svg
          className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 transform text-gray-400"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <circle cx="20" cy="20" r="20" fill="#F79327" />
            <path
              d="M30.4948 12.4631C30.3493 12.3164 30.1762 12.2 29.9854 12.1205C29.7947 12.041 29.5901 12.0001 29.3834 12.0001C29.1768 12.0001 28.9722 12.041 28.7815 12.1205C28.5907 12.2 28.4176 12.3164 28.2721 12.4631L16.6105 24.1404L11.7111 19.2253C11.56 19.0793 11.3816 18.9646 11.1862 18.8876C10.9907 18.8105 10.7821 18.7728 10.572 18.7764C10.362 18.78 10.1547 18.825 9.96207 18.9087C9.76941 18.9925 9.59513 19.1133 9.44918 19.2644C9.30324 19.4155 9.18848 19.5939 9.11146 19.7893C9.03444 19.9847 8.99667 20.1934 9.0003 20.4035C9.00393 20.6135 9.0489 20.8208 9.13264 21.0134C9.21637 21.2061 9.33723 21.3804 9.48832 21.5263L15.4991 27.5371C15.6446 27.6838 15.8178 27.8003 16.0085 27.8797C16.1993 27.9592 16.4039 28.0001 16.6105 28.0001C16.8171 28.0001 17.0217 27.9592 17.2125 27.8797C17.4032 27.8003 17.5764 27.6838 17.7219 27.5371L30.4948 14.7642C30.6537 14.6176 30.7805 14.4397 30.8672 14.2417C30.954 14.0436 30.9987 13.8298 30.9987 13.6136C30.9987 13.3975 30.954 13.1836 30.8672 12.9856C30.7805 12.7876 30.6537 12.6097 30.4948 12.4631Z"
              fill="white"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default FormAbout;
