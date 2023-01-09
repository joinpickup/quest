import React, { useEffect } from "react";
import Button from "../Button/Button";

export enum ToastType {
  SUCCESS,
  WARNING,
  ERROR,
}

interface ToastProps {
  close: VoidFunction;
  isOpen: boolean;
  type: ToastType;
  message: string;
}

export default function Toast({ close, isOpen, type, message }: ToastProps) {
  return (
    <>
      {type == ToastType.SUCCESS ? (
        <div
          className={`${
            isOpen ? "" : "hidden"
          } fixed right-0  m-4 text-sm rounded-lg shadow-lg bg-gray-600`}
          role="alert"
        >
          <div className="p-4 border-l-4 border-green-300 h-min flex justify-start space-x-2 rounded-lg items-center">
            <svg
              className="w-8 h-8 text-green-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">{message}</div>
            <Button
              className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-500 hover:bg-gray-500"
              click={() => close()}
            >
              <div>Close</div>
            </Button>
          </div>
        </div>
      ) : type == ToastType.ERROR ? (
        <div
          className={`${
            isOpen ? "" : "hidden"
          } fixed right-0 m-4 text-sm rounded-lg shadow-lg bg-gray-600`}
          role="alert"
        >
          <div className="p-4 border-l-4 border-red-500 h-min flex justify-start space-x-2 rounded-lg items-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">{message}</div>
            <Button
              className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-500 hover:bg-gray-500"
              click={() => close()}
            >
              <div>Close</div>
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
