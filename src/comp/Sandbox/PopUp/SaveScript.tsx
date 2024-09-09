import { UserSandboxScript, paymentAtom } from "@/comp/atom";
import { trpc } from "@/utils/trpc";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateSandboxScriptEvent } from "@server/routers/userSandboxScripts";
import { create } from "domain";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { SelectedView } from "../SandBoxInput";

interface SaveScriptProps {
  onClose: () => void;
  onSave: (script: UserSandboxScript) => void;
  sandboxScript?: UserSandboxScript;
  selectedView: SelectedView;
  scriptContent: string;
  editorRef: React.MutableRefObject<any>;
  witnessRef: React.MutableRefObject<any>;
  scriptSigRef: React.MutableRefObject<any>;
  pubkeyScriptRef: React.MutableRefObject<any>;
}

const SaveScript = (props: SaveScriptProps) => {
  const {
    onClose,
    onSave,
    sandboxScript,
    scriptContent,
    editorRef,
    pubkeyScriptRef,
    scriptSigRef,
    selectedView,
    witnessRef,
  } = props;
  const [actionLabel, setActionLabel] = useState<string>("");
  console.log("CURRENT SCRIPT ON SAVE", sandboxScript);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackMessageType, setFeedbackMessageType] = useState<
    "success" | "error"
  >("success");

  const [payment] = useAtom(paymentAtom);
  const [scriptOwnership, setScriptOwnership] = useState("");
  console.log("WHO OWNS THE SCRIPT", scriptOwnership);
  const isMyScript =
    sandboxScript !== undefined && payment?.userId === sandboxScript.userId;
  const someoneElseScript =
    sandboxScript !== undefined && payment?.userId !== sandboxScript.userId;

  const [title, setTitle] = useState<string>(sandboxScript?.name || "");
  const [description, setDescription] = useState<string>(
    sandboxScript?.description || ""
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const createScriptEvent = trpc.createScriptEvent.useMutation();
  const updateScriptEvent = trpc.updateScriptEvent.useMutation();
  const bookMarkScriptEvent = trpc.bookmarkSandboxScript.useMutation();

  // useEffect(() => {
  //   // TODO: this has to change to be based on the selected view
  //   // if the selected view is pubkey/script, then I should be able to get the pubkeyScript and the sigscript from the previous view
  //   // if the selected view is pubkey/witness, then I should be able to get the pubkeyScript and the witness from the previous view
  //   // if the selected view is sandbox, then I should be able to get the sandbox content from the previous view

  //   let freeform = "";
  //   let pubkeyScript = "";
  //   let scriptSig = "";
  //   let witness = "";

  //   switch (selectedView) {
  //     case "Pubkey/script":
  //       pubkeyScript = pubkeyScriptRef.current?.getModel()?.getValue();
  //       scriptSig = scriptSigRef.current?.getModel()?.getValue();
  //       break;
  //     case "Pubkey/witness":
  //       pubkeyScript = pubkeyScriptRef.current?.getModel()?.getValue();
  //       witness = witnessRef.current?.getModel()?.getValue();
  //       break;
  //     case "Sandbox":
  //       freeform = editorRef.current?.getModel()?.getValue();
  //       break;
  //   }

  //   const model = editorRef.current?.getModel();

  //   let content = "";
  //   if (model) {
  //     content = model.getValue();
  //   }
  //   if (isMyScript) {
  //     setActionLabel("Update Script");
  //   } else if (someoneElseScript) {
  //     if (content === sandboxScript.content) {
  //       setActionLabel("Bookmark Script");
  //       console.log("BOOKMARKED SUCCESSFULLY");
  //     } else {
  //       setActionLabel("Save Script");
  //     }
  //   } else {
  //     setActionLabel("Save Script");
  //   }
  // }, [isMyScript, someoneElseScript]);

  useEffect(() => {
    let currentContent = {
      freeform: "",
      pubkeyScript: "",
      scriptSig: "",
      witness: "",
    };

    switch (selectedView) {
      case "Pubkey/script":
        currentContent.pubkeyScript =
          pubkeyScriptRef.current?.getModel()?.getValue() || "";
        currentContent.scriptSig =
          scriptSigRef.current?.getModel()?.getValue() || "";
        break;
      case "Pubkey/witness":
        currentContent.pubkeyScript =
          pubkeyScriptRef.current?.getModel()?.getValue() || "";
        currentContent.witness =
          witnessRef.current?.getModel()?.getValue() || "";
        break;
      case "Sandbox":
        currentContent.freeform =
          editorRef.current?.getModel()?.getValue() || "";
        break;
    }

    const isContentSame = () => {
      if (!sandboxScript) return false;

      switch (selectedView) {
        case "Pubkey/script":
          return (
            currentContent.pubkeyScript === sandboxScript.pubkeyScript &&
            currentContent.scriptSig === sandboxScript.sigScript
          );
        case "Pubkey/witness":
          return (
            currentContent.pubkeyScript === sandboxScript.pubkeyScript &&
            currentContent.witness === sandboxScript.witnessScript
          );
        case "Sandbox":
          return currentContent.freeform === sandboxScript.freeformContent;
        default:
          return false;
      }
    };

    if (isMyScript) {
      setActionLabel("Update Script");
    } else if (someoneElseScript) {
      if (isContentSame()) {
        setActionLabel("Bookmark Script");
        console.log("BOOKMARKED SUCCESSFULLY");
      } else {
        setActionLabel("Save Script");
      }
    } else {
      setActionLabel("Save Script");
    }
  }, [isMyScript, someoneElseScript, selectedView, sandboxScript]);

  // const handleSaveClick = async () => {
  //   // TODO: this has to change to be based on the selected view
  //   // if the selected view is pubkey/script, then I should be able to get the pubkeyScript and the sigscript from the previous view
  //   // if the selected view is pubkey/witness, then I should be able to get the pubkeyScript and the witness from the previous view
  //   // if the selected view is sandbox, then I should be able to get the sandbox content from the previous view

  //   const model = editorRef.current?.getModel();

  //   let content = "";
  //   if (model) {
  //     content = model.getValue();
  //   }

  //   if (sandboxScript === undefined) {
  //     setFeedbackMessageType("error");
  //     setFeedbackMessage("No script to save or update.");
  //     return;
  //   }

  //   console.log("content", content);

  //   try {
  //     let result;

  //     if (isMyScript) {
  //       result = await updateScriptEvent.mutateAsync({
  //         id: sandboxScript.id,
  //         name: title,
  //         content: content,
  //         description: description,
  //       });
  //       setFeedbackMessageType("success");
  //       setFeedbackMessage("Script Updated successfully!");
  //     } else if (someoneElseScript) {
  //       if (content === sandboxScript.content) {
  //         result = await bookMarkScriptEvent.mutateAsync({
  //           scriptId: sandboxScript.id,
  //         });
  //         setFeedbackMessageType("success");
  //         setFeedbackMessage("Script Bookmarked successfully!");
  //       } else {
  //         result = await createScriptEvent.mutateAsync({
  //           content: content,
  //           name: title,
  //           description: description,
  //         });
  //         setFeedbackMessageType("success");
  //         setFeedbackMessage("Script Created successfully!");
  //       }
  //     } else {
  //       result = await createScriptEvent.mutateAsync({
  //         content: content,
  //         name: title,
  //         description: description,
  //       });
  //       setFeedbackMessageType("success");
  //       setFeedbackMessage("Script Created successfully!");
  //     }

  //     if (result) {
  //       const updatedScript = {
  //         ...result,
  //         createdAt: new Date(result.createdAt),
  //         updatedAt: new Date(result.updatedAt),
  //       };

  //       onSave(updatedScript);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("Error saving script:", error.message);
  //       setFeedbackMessageType("error");
  //       if (
  //         error.message.includes("Script is already bookmarked by the user")
  //       ) {
  //         setFeedbackMessage("You have already bookmarked this script.");
  //       } else {
  //         setFeedbackMessage(
  //           "An error occurred while saving the script. Please try again."
  //         );
  //       }
  //     }
  //   }
  // };

  const handleSaveClick = async () => {
    if (sandboxScript === undefined) {
      setFeedbackMessageType("error");
      setFeedbackMessage("No script to save or update.");
      return;
    }

    let scriptContent = {
      scriptType:
        selectedView === "Sandbox"
          ? "FREEFORM"
          : selectedView === "Pubkey/script"
          ? "PUBKEY_SIGSCRIPT"
          : "PUBKEY_WITNESS",
      freeformContent: "",
      pubkeyScript: "",
      sigScript: "",
      witnessScript: "",
    };

    switch (selectedView) {
      case "Sandbox":
        scriptContent.freeformContent =
          editorRef.current?.getModel()?.getValue() || "";
        break;
      case "Pubkey/script":
        scriptContent.pubkeyScript =
          pubkeyScriptRef.current?.getModel()?.getValue() || "";
        scriptContent.sigScript =
          scriptSigRef.current?.getModel()?.getValue() || "";
        break;
      case "Pubkey/witness":
        scriptContent.pubkeyScript =
          pubkeyScriptRef.current?.getModel()?.getValue() || "";
        scriptContent.witnessScript =
          witnessRef.current?.getModel()?.getValue() || "";
        break;
    }

    console.log("scriptContent", scriptContent);

    try {
      let result;

      if (isMyScript) {
        result = await updateScriptEvent.mutateAsync({
          id: sandboxScript.id,
          name: title,
          description: description,
          ...scriptContent,
        });
        setFeedbackMessageType("success");
        setFeedbackMessage("Script Updated successfully!");
      } else if (someoneElseScript) {
        const isContentSame = () => {
          switch (selectedView) {
            case "Sandbox":
              return (
                scriptContent.freeformContent === sandboxScript.freeformContent
              );
            case "Pubkey/script":
              return (
                scriptContent.pubkeyScript === sandboxScript.pubkeyScript &&
                scriptContent.sigScript === sandboxScript.sigScript
              );
            case "Pubkey/witness":
              return (
                scriptContent.pubkeyScript === sandboxScript.pubkeyScript &&
                scriptContent.witnessScript === sandboxScript.witnessScript
              );
            default:
              return false;
          }
        };

        if (isContentSame()) {
          result = await bookMarkScriptEvent.mutateAsync({
            scriptId: sandboxScript.id,
          });
          setFeedbackMessageType("success");
          setFeedbackMessage("Script Bookmarked successfully!");
        } else {
          result = await createScriptEvent.mutateAsync({
            name: title,
            description: description,
            ...scriptContent,
          });
          setFeedbackMessageType("success");
          setFeedbackMessage("Script Created successfully!");
        }
      } else {
        result = await createScriptEvent.mutateAsync({
          name: title,
          description: description,
          ...scriptContent,
        });
        setFeedbackMessageType("success");
        setFeedbackMessage("Script Created successfully!");
      }

      if (result) {
        const updatedScript = {
          ...result,
          createdAt: new Date(result.createdAt),
          updatedAt: new Date(result.updatedAt),
        };

        onSave(updatedScript);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving script:", error.message);
        setFeedbackMessageType("error");
        if (
          error.message.includes("Script is already bookmarked by the user")
        ) {
          setFeedbackMessage("You have already bookmarked this script.");
        } else {
          setFeedbackMessage(
            "An error occurred while saving the script. Please try again."
          );
        }
      }
    }
  };
  const saveEnabled = title.length > 0;

  const headerTitle = isMyScript ? "Editing Script" : "Saving Script";
  const headerSubtitle = isMyScript
    ? "edit the fields you'd like to update below"
    : "share your script to revisit or share";
  const buttonText = actionLabel;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur"
        onClick={() => {}}
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-50 flex h-[591px] w-[346px] cursor-default flex-col items-center rounded-xl bg-[#110B24] p-6 text-white shadow-xl md:h-[700px] md:w-[784px]"
        >
          <div className="relative z-50 flex w-full flex-col items-center justify-center">
            {feedbackMessage && (
              <div
                className={`mt-2 ${
                  feedbackMessageType === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {feedbackMessage}
              </div>
            )}
            <button className="absolute left-2 top-2 p-2" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
              {headerTitle}
            </h3>
            <p className="font-extralight">{headerSubtitle}</p>
            <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>

            <div className="h-full w-full py-4">
              <label className="w-full pl-8">Title</label>
              <input
                type="text"
                className="text-md my-4 flex h-[50px] w-full rounded-full border-b border-white border-opacity-10 bg-[#0c071D] pl-8 pr-4 text-white focus:outline-none"
                placeholder="Start typing here..."
                value={title}
                onChange={handleTitleChange}
              />

              <label className="w-full pl-8">Description</label>
              <textarea
                rows={5}
                name="comment"
                value={description}
                onChange={handleDescriptionChange}
                id="comment"
                className="text-md my-4 flex w-full rounded-[40px] border-b border-white border-opacity-10 bg-[#0c071D] py-5 pl-8 pr-4 text-white focus:outline-none"
                placeholder="waiting for title and url..."
              />
            </div>

            <button
              type="submit"
              className={`mt-6 flex w-full  flex-col items-center justify-center rounded-lg ${
                !saveEnabled
                  ? "cursor-not-allowed bg-gray-500 opacity-50"
                  : "cursor-pointer bg-dark-orange"
              }
              shadow-md transition-all hover:shadow-lg`}
              onClick={handleSaveClick}
              disabled={!saveEnabled}
            >
              <h3 className="  py-4 text-left text-xl  text-white ">
                <FontAwesomeIcon className="mx-2" icon={faBookmark} />
                {buttonText}
              </h3>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SaveScript;
