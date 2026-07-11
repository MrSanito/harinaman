import * as React from "react";

interface DropdownMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(undefined);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

  const clickHandler = () => context.setOpen(!context.open);

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

export function DropdownMenuContent({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "end";
  className?: string;
}) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu");

  if (!context.open) return null;

  return (
    <div
      className={`absolute ${
        align === "end" ? "right-0" : "left-0"
      } mt-2 w-48 origin-top-right rounded-md bg-[#FAF7F0] border border-[#8FBF6F]/30 shadow-lg ring-1 ring-black/5 focus:outline-none z-50 ${className}`}
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onSelect,
  className = "",
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) throw new Error("DropdownMenuItem must be used within DropdownMenu");

  const clickHandler = () => {
    if (onSelect) onSelect();
    context.setOpen(false);
  };

  return (
    <button
      onClick={clickHandler}
      className={`block w-full px-4 py-2 text-left text-sm text-[#1F3D2B] hover:bg-[#8FBF6F]/20 transition-colors cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
