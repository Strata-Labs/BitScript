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
  //   const { toast } = useToast();

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied!");
        // toast({
        //   title: "Copied!",
        //   description: `${field} has been copied to clipboard.`,
        // });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

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
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => copyToClipboard(key.address, "Address")}
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </TableCell>
            <TableCell className="w-1/3">
              <div className="flex items-center space-x-2">
                <span className="max-w-[300px] truncate">{key.publicKey}</span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => copyToClipboard(key.publicKey, "Public Key")}
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </TableCell>
            <TableCell className="w-1/3">
              <div className="flex items-center space-x-2">
                <span className="max-w-[250px] truncate">{key.privateKey}</span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => copyToClipboard(key.privateKey, "Private Key")}
                >
                  <Copy className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DerivedKeysTable;
