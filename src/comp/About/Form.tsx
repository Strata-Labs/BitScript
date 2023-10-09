const FormAbout = () => {
  return (
    <div className="flex flex-col">
      <p className="font-extralight text-[#BBBBBB]">Email Message</p>
      <input
        type="text"
        className=" h-[182px] rounded-3xl border border-[#BBBBBB]  p-4 outline-none  md:w-[480px]"
        placeholder="r-value"
      />
      <p className="font-extralight text-[#BBBBBB]">Email Address</p>
      <input
        type="text"
        className="h-[56px] rounded-3xl border border-[#BBBBBB] p-4 outline-none md:w-[480px]"
        placeholder="youremail@example.com"
      />
    </div>
  );
};

export default FormAbout;
