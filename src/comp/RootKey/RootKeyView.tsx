import RootKeyFooter from "./RootKeyFooter";
import RootKeyForm from "./RootKeyForm";

export default function RootKeyView() {
  return (
    <div className=" w-screen overflow-auto text-black">
      <div className="flex h-screen w-screen flex-col">
        <div className="mx-[80px] flex flex-col md:ml-[270px] md:mr-0">
          <h1 className="mt-5 text-[24px] font-medium">Seed Generator</h1>
          <p className=" text-[14px] font-light text-gray-500">
            A tool that helps you generate a seed and wallet address
          </p>
        </div>
        <RootKeyForm />
        <RootKeyFooter />
      </div>
    </div>
  );
}
