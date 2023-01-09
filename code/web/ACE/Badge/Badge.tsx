import React from "react";

interface BadgeProps {
  className?: string;
  text?: string;
}

export default function Badge({ className, text }: BadgeProps) {
  return (
    <>
      <div
        className={
          className ??
          "text-xs font-semibold px-2 w-min h-min rounded text-gray-600 bg-orange-400"
        }
      >
        {text}
      </div>
    </>
  );
}
