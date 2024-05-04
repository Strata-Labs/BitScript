import { cn } from "../lib/utils";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-height-[92vh] bg-white pb-5 pt-5 flex h-full w-full flex-col md:items-center md:justify-center gap-4 overflow-auto md:pl-[240px] px-8  text-black"
      )}
    >
      {children}
    </div>
  );
}
