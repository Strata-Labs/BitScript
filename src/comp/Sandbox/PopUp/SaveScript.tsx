import { UserSandboxScript, paymentAtom } from "@/comp/atom";
import { trpc } from "@/utils/trpc";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateSandboxScriptEvent } from "@server/routers/userSandboxScripts";
import { create } from "domain";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface SaveScriptProps {
  onClose: () => void;
  onSave: (script: UserSandboxScript) => void;
  sandboxScript?: UserSandboxScript;
  scriptContent: string;
  editorRef: React.MutableRefObject<any>;
}

const SaveScript = (props: SaveScriptProps) => {
  const { onClose, onSave, sandboxScript, scriptContent, editorRef } = props;

  const [payment] = useAtom(paymentAtom);
  const isMyScript =
    sandboxScript !== undefined && payment?.userId === sandboxScript.userId;

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

  const handleSaveClick = async () => {
    const model = editorRef.current?.getModel();

    let content = "";
    if (model) {
      content = model.getValue();
    }

    if (sandboxScript === undefined) {
      return;
    }

    console.log("content", content);

    let result;
    if (isMyScript) {
      result = await updateScriptEvent.mutateAsync({
        id: sandboxScript.id,
        name: title,
        content: content,
        description: description,
      });
    } else {
      result = await createScriptEvent.mutateAsync({
        content: content,
        name: title,
        description: description,
      });
    }

    // for some reason mutations come back with strings for dates
    const updatedScript = {
      ...result,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.createdAt),
    };

    onSave(updatedScript);
  };

  const saveEnabled = title.length > 0 && description.length > 0;

  const headerTitle = isMyScript ? "Editing Script" : "Saving Script";
  const headerSubtitle = isMyScript
    ? "edit the fields you'd like to update below"
    : "share your script to revisit or share";
  const buttonText = isMyScript ? "Update Script" : "Save Script";

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
                className="text-md my-4 flex w-full rounded-[40px] border-b border-white border-opacity-10 bg-[#0c071D] pl-8 pr-4 text-white focus:outline-none"
                placeholder="waiting for title and url..."
              />
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full  cursor-pointer flex-col items-center justify-center rounded-lg bg-dark-orange shadow-md transition-all hover:shadow-lg"
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
