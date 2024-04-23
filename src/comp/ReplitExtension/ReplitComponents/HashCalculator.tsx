import React from "react";

import { Tabs, TabsList, TabsTrigger } from "./ui/Tab";
import { Input } from "./ui/Input";

import { useAtom } from "jotai";
import { hashingAlgorithm, showHashingAlgorithm } from "../atoms";
import { motion } from "framer-motion";
import HashingAlgorithm from "./HashingAlgorithm";
import HashCalculatorContent from "./hashCalculatorContent";

export default function HashCalculator() {
  const [showHashingContainer, setShowHashingContainer] =
    useAtom(showHashingAlgorithm);
  return (
    <div>
      {showHashingContainer ? (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          key="newComponent"
        >
          <HashingAlgorithm />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key="originalComponent"
        >
          <HashCalculatorContent />
        </motion.div>
      )}
    </div>
  );
}
