import React from "react"

export enum ButtonType {
    DEFAULT,
    CONTAINED
}

interface ButtonProps {
    click: VoidFunction
    children?: JSX.Element
    className?: string
    type?: ButtonType
}

export default function Button({click, children, className, type}: ButtonProps) {
    return(
        <>
            {
                (type == undefined || type == null) || type == ButtonType.DEFAULT ? 
                    <button 
                        className={className ?? "flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-600 hover:bg-gray-600"}
                        onClick={() => {
                        click()
                    }}>
                        {children}
                    </button>
                : (
                    <button 
                        className={className ?? "flex p-2 rounded-lg cursor-pointer items-center justify-center bg-green-500 hover:bg-green-600 w-full"}
                        onClick={() => {
                        click()
                    }}>
                        {children}
                    </button>
                )
            }
        </>
    )
}