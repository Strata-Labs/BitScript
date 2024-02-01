const RpcBottomRight = () => {
  return (
    <div className="h-full w-full">
      {/* General container */}
      <div className="flex h-full w-full flex-col">
        {/* Title*/}
        <div className="mx-5 mt-10 flex items-center justify-between">
          <p className="text-[20px] font-bold text-[#0C071D]">Result</p>
        </div>
        {/* Text Area */}
        <textarea
          className="mx-5 my-5 h-full cursor-pointer rounded-[32px] bg-[#F3F3F3] py-6 pl-6 pr-16 text-black outline-none"
          placeholder="hex:  Returns the hash of the best (tip) block in the longest blockchain"
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default RpcBottomRight;
