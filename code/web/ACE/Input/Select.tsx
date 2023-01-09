import React from "react";

interface InputProps {
  change: (v: string) => void;
  children?: JSX.Element;
}

export default function Select({ change, children }: InputProps) {
  return (
    <select
      className="w-full h-10 px-4 font-bold bg-gray-600 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:outline-none focus:ring-green-500"
      onChange={(e) => {
        change(e.target.value);
      }}
      {...children}
    ></select>
  );
}
