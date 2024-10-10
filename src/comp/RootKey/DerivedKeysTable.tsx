import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/comp/Ui/Table";
import { Button } from "@/comp/Ui/button";
import { Copy } from "lucide-react";
import { classNames as cn } from "@/utils";
import { CopyButton } from "./CopyButton";
// import { useToast } from "@/comp/Ui/use-toast";

interface DerivedKey {
  path: string;
  address: string;
  publicKey: string;
  privateKey: string;
}

interface DerivedKeysTableProps {
  keys: DerivedKey[];
}

const DerivedKeysTable: React.FC<DerivedKeysTableProps> = ({ keys }) => {


  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none">
          <TableHead>Path</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Public Key</TableHead>
          <TableHead>Private Key</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((key, index) => (
          <TableRow
            key={index}
            className={cn(
              "border-none",
              index % 2 === 0 ? "bg-gray-100" : "bg-transparent"
            )}
          >
            <TableCell className="w-1/4 pr-4">{key.path}</TableCell>
            <TableCell className="w-1/3">
              <div className="flex items-center space-x-2">
                <span className="max-w-[300px] truncate">{key.address}</span>
                <CopyButton textToCopy={key.address} />
              </div>
            </TableCell>
            <TableCell className="w-1/3">
              <div className="flex items-center space-x-2">
                <span className="max-w-[300px] truncate">{key.publicKey}</span>
                <CopyButton textToCopy={key.publicKey} />
              </div>
            </TableCell>
            <TableCell className="w-1/3">
              <div className="flex items-center space-x-2">
                <span className="max-w-[250px] truncate">{key.privateKey}</span>
                <CopyButton textToCopy={key.privateKey} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DerivedKeysTable;
