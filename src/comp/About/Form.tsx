const FormAbout = () => {
  return (
    <div className="flex flex-col">
      <p className="font-extralight text-[#BBBBBB]">Email Message</p>
      <textarea
        className="h-[182px] w-[440px] rounded-3xl border border-[#BBBBBB] p-4 font-bold outline-none md:w-[480px]"
        placeholder="type your message here..."
      />
      <p className="font-extralight text-[#BBBBBB]">Email Address</p>
      <input
        type="text"
        className="h-[56px] w-[440px] rounded-3xl border border-[#BBBBBB] p-4 font-bold outline-none md:w-[480px]"
        placeholder="youremail@example.com"
      />
    </div>
  );
};

export default FormAbout;
