import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    const variants = {
      default: "bg-[#4C8C4B] text-white hover:bg-[#1F3D2B]",
      outline: "border border-[#8FBF6F]/30 bg-transparent hover:bg-[#8FBF6F]/10",
      ghost: "hover:bg-[#8FBF6F]/10",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-11 rounded-md px-8 text-sm",
    };

    const classNames = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: `${classNames} ${child.props.className || ""}`,
        ...props,
        children: child.props.children
      });
    }

    return (
      <button
        ref={ref}
        className={classNames}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
