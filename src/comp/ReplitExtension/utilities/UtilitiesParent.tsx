import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ReplitComponents/ui/Tab";
import PageShell from "../ReplitComponents/PageShell";
import DataFormatter from "../ReplitComponents/dataFormatter/DataFormatter";
import HashCalculator from "../ReplitComponents/HashCalculator";

export default function UtilitiesParent() {
  return (
    <PageShell>
      <p className="self-start pl-9 text-xl font-medium">Utility tools</p>
      <Tabs defaultValue="data-formatter" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data-formatter">Data Formatter</TabsTrigger>
          <TabsTrigger value="hash-calculator">Hashing Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="data-formatter">
          <DataFormatter />
        </TabsContent>
        <TabsContent value="hash-calculator">
          <HashCalculator />
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
