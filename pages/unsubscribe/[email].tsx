import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const SubscribePageHandler = () => {
  const router = useRouter();
  const { email } = router.query;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const unsubscribeFromMailingListEvent =
    trpc.unsubscribeFromMailingList.useMutation();
  const resubscribeToMailingListEvent =
    trpc.resubscribeToMailingList.useMutation();
  const checkEmailInMailingList = trpc.checkEmailInMailingList.useQuery(
    { email: email as string },
    { enabled: !!email }
  );

  useEffect(() => {
    const handleUnsubscribe = async () => {
      if (email && checkEmailInMailingList.data) {
        try {
          await unsubscribeFromMailingListEvent.mutateAsync({
            email: email as string,
          });
          setMessage("You've been unsubscribed.");
          setIsSubscribed(false);
        } catch (error) {
          setMessage("An error occurred. Please try again.");
        }
      } else if (checkEmailInMailingList.data === false) {
        setMessage("Error: Email not found in our database.");
        setIsSubscribed(false);
      }
      setIsLoading(false);
    };

    if (checkEmailInMailingList.data !== undefined) {
      handleUnsubscribe();
    }
  }, [checkEmailInMailingList.data]);

  const handleResubscribe = async () => {
    if (email) {
      try {
        await resubscribeToMailingListEvent.mutateAsync({
          email: email as string,
        });
        setMessage("You've been re-subscribed.");
        setIsSubscribed(true);
      } catch (error) {
        setMessage("An error occurred while resubscribing. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="ml-10 flex h-screen items-center justify-center text-black md:ml-[260px]">
        Processing your request...
      </div>
    );
  }

  return (
    <div className="ml-10 flex min-h-screen flex-col items-center justify-center bg-gray-100 font-sans md:ml-[260px]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">{message}</h2>
        {isSubscribed ? (
          <p className="mb-6 text-gray-600">
            You are currently subscribed to our mailing list.
          </p>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              We won't send you any more emails.
            </p>
            <div>
              <span className="mr-2 text-gray-600">
                Unsubscribe by accident?
              </span>
              <button
                onClick={handleResubscribe}
                className="rounded border border-indigo-500 bg-transparent px-4 py-2 text-indigo-500 transition duration-300 hover:bg-indigo-100"
              >
                Re-subscribe
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribePageHandler;
