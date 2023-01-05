import React, { useEffect } from "react"
import Button from "../Button/Button"

export enum ToastType {
    SUCCESS,
    WARNING,
    ERROR
}

interface ToastProps {
    close: VoidFunction
    isOpen: boolean
    type: ToastType
    message: string
}

export default function Toast({close, isOpen, type, message}: ToastProps) {
    return(
        <>
            {
                type == ToastType.SUCCESS ? 
                    <div className={`${isOpen ? "" : "hidden"} fixed right-0  m-4 text-sm rounded-lg shadow-lg bg-gray-600`} role="alert">
                        <div className="p-4 border-l-4 border-green-300 h-min flex justify-start space-x-2 rounded-lg items-center">
                            <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div className="flex-1">{message}</div>
                            <Button 
                                className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-500 hover:bg-gray-500"
                                click={() => close()}>
                                <div>Close</div>
                            </Button>
                        </div>
                    </div> 
                : type == ToastType.ERROR ? 
                    <div className={`${isOpen ? "" : "hidden"} fixed right-0 m-4 text-sm rounded-lg shadow-lg bg-gray-600`} role="alert">
                        <div className="p-4 border-l-4 border-red-500 h-min flex justify-start space-x-2 rounded-lg items-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div className="flex-1">{message}</div>
                            <Button 
                                className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-500 hover:bg-gray-500"
                                click={() => close()}>
                                <div>Close</div>
                            </Button>
                        </div>
                    </div> : <></>
            }
        </>
    )
}