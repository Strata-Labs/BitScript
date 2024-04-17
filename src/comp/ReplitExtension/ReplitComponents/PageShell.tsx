import { cn } from "../lib/utils";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-height-[92vh] mb-5 mt-5 flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto pl-[240px] text-black"
      )}
    >
      {children}
    </div>
  );
}
