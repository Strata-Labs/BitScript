import { X } from "lucide-react";
import { Button } from "../Ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Ui/dialog";

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
      {/* <Button
        variant="rootkey"
        className="mt-4 w-full rounded-md bg-green-500 hover:bg-green-600 sm:mt-0 sm:w-auto"
      >
        View features
      </Button> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="rootkey"
            className="mt-4 w-full rounded-md bg-green-500 hover:bg-green-600 sm:mt-0 sm:w-auto"
          >
            View features
          </Button>
        </DialogTrigger>
        <DialogContent className="z-10 bg-white text-black sm:max-w-[425px]">
          <DialogClose className="absolute right-4 top-4 rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300">
            <X className="h-4 w-4 text-black" strokeWidth={3} />
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <img src="/Rootkey.svg" alt="Rootkey" className="mr-2 h-6 w-6" />
              Rootkey
            </DialogTitle>
            <p className="text-xs text-gray-500">product highlights</p>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <div className="flex items-start rounded-xl bg-gray-50 p-4 text-sm hover:bg-gray-100">
              <img
                src="/coins-rotate.svg"
                alt="Lock"
                className="mr-3 mt-1 h-5 w-5"
              />
              <p>Easily create and manage your crypto passwords in one place</p>
            </div>
            <div className="flex items-start rounded-xl bg-gray-50 p-4 text-sm hover:bg-gray-100">
              <img
                src="/wallet-03.svg"
                alt="Key"
                className="mr-3 mt-1 h-5 w-5"
              />
              <p>
                Allows you to create hierarchal keys and multiple accounts with
                a seed
              </p>
            </div>
            <div className="flex items-start rounded-xl bg-gray-50 p-4 text-sm hover:bg-gray-100">
              <img
                src="/shield-check.svg"
                alt="Shield"
                className="mr-3 mt-1 h-5 w-5"
              />
              <p>Maximum security with total offline functionality</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              variant="rootkey_black"
              className="w-[48%] bg-black text-green-500"
            >
              Get it for Android
            </Button>
            <Button
              type="button"
              variant="rootkey_black"
              className="w-[48%] bg-black text-green-500"
            >
              Get it for iOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
