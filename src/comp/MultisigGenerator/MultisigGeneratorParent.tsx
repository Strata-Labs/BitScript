import { useState } from "react";
import { useTranslation } from "next-i18next";
import MultisigGenerator from "./MultisigGenerator";

const MultisigGeneratorParent = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useTranslation("multisig");

  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-10">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="font-extralight text-[#687588]">{t("utility_tool")}</p>
          <p className="text-[29px] font-semibold text-black">
            {t("title")}
          </p>
          <p className="font-extralight text-[#687588]">
            {t("description")}{" "}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-[#F79327] hover:underline"
            >
              {showInfo ? t("hide_info") : t("learn_more")}
            </button>
          </p>

          {showInfo && (
            <div className="mt-4 rounded-lg border border-[#F3F3F3] bg-white p-4">
              <h3 className="mb-2 text-lg font-medium text-black">
                {t("info_types_heading")}
              </h3>
              <div className="space-y-3 text-sm text-[#687588]">
                <div>
                  <p className="font-medium text-black">
                    {t("info_p2sh_title")}
                  </p>
                  <p>{t("info_p2sh_desc")}</p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    {t("info_p2wsh_title")}
                  </p>
                  <p>{t("info_p2wsh_desc")}</p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    {t("info_p2sh_p2wsh_title")}
                  </p>
                  <p>{t("info_p2sh_p2wsh_desc")}</p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    {t("info_p2tr_key_title")}
                  </p>
                  <p>{t("info_p2tr_key_desc")}</p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    {t("info_p2tr_script_title")}
                  </p>
                  <p>{t("info_p2tr_script_desc")}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <MultisigGenerator />
      </div>
    </div>
  );
};

export default MultisigGeneratorParent;
