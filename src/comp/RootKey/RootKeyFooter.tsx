import { Button } from "../Ui/button";

export default function RootKeyFooter() {
  return (
    <div className="mx-2 mb-10 flex flex-col items-center justify-between space-y-4 rounded-lg bg-black p-4 sm:mx-6 sm:flex-row sm:space-y-0 md:ml-[260px] md:mr-10">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 md:space-x-12">
        <div className="flex h-10 w-10">
          <img src="/Rootkey.svg" alt="Rootkey" className="h-full w-full" />
        </div>
        <div className="text-center text-white sm:text-left">
          <p className="font-bold">
            Introducing{" "}
            <span className="font-light text-green-500">Rootkey</span>
          </p>
          <span className="text-sm text-gray-400 sm:text-base">
            The best crypto password manager, available on iOS and Android
          </span>
        </div>
      </div>
      <Button
        variant="rootkey"
        className="mt-4 w-full rounded-md bg-green-500 hover:bg-green-600 sm:mt-0 sm:w-auto"
      >
        View features
      </Button>
    </div>
  );
}
