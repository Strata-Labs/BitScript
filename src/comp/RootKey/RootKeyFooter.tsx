import { Button } from "../Ui/button";

export default function RootKeyFooter() {
  return (
    <div className="mb-10 ml-[260px] mr-10 flex items-center justify-between rounded-lg bg-black p-4">
      <div className="flex items-center space-x-12">
        <div className="flex ml-2 h-10 w-10">
          <img src="/Rootkey.svg" alt="Rootkey" className="h-full w-full" />
        </div>
        <div className="text-white">
          <p className="font-bold">
            Introducing{" "}
            <span className="font-light text-green-500">Rootkey</span>
          </p>
          <span className="text-gray-400">
            The best crypto password manager, available on iOS and Android
          </span>
        </div>
      </div>
      <Button
        variant="rootkey"
        className="rounded-md bg-green-500 hover:bg-green-600"
      >
        View features
      </Button>
    </div>
  );
}
