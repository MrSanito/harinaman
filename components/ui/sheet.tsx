import * as React from "react";
import { X } from "lucide-react";

interface SheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined);

export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetTrigger must be used within Sheet");

  const clickHandler = () => context.setOpen(true);

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        clickHandler();
        if ((children.props as any).onClick) (children.props as any).onClick(e);
      },
    } as any);
  }

  return (
    <button onClick={clickHandler}>
      {children}
    </button>
  );
}

export function SheetContent({
  children,
  side = "right",
  className = "",
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetContent must be used within Sheet");

  if (!context.open) return null;

  return (
    <div className="fixed inset-0 z-55 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => context.setOpen(false)}
      />
      {/* Content */}
      <div
        className={`fixed inset-y-0 ${
          side === "right" ? "right-0" : "left-0"
        } z-55 h-full w-3/4 max-w-sm border-l border-[#8FBF6F]/30 bg-[#FAF7F0] p-6 shadow-lg transition-transform duration-300 ease-in-out ${className}`}
      >
        {/* Close Button inside Drawer */}
        <button
          onClick={() => context.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none cursor-pointer"
        >
          <X className="h-5 w-5 text-[#1F3D2B]" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetClose({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetClose must be used within Sheet");

  const clickHandler = () => context.setOpen(false);

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        clickHandler();
        if ((children.props as any).onClick) (children.props as any).onClick(e);
      },
    } as any);
  }

  return (
    <button onClick={clickHandler}>
      {children}
    </button>
  );
}
