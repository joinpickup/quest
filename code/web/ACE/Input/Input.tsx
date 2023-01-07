import React from "react"

interface InputProps {
    error?: boolean;
    setError?: (v: boolean) => void
    change: (v: string) => void
    type?: string
    placeholder: string
    value: string
    children?: JSX.Element
}

export default function Input({error, setError, change, placeholder, value, type}: InputProps) {
    return(
        <input className={`${error ? "ring-2 ring-red-400" : ""} w-full h-10 px-4 font-bold text-gray-300 bg-gray-600 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:outline-none focus:ring-green-500`} 
                type={type ?? "text"}
                placeholder={placeholder}
                value={value} 
                onChange={(e) => {
                    if (setError) {
                        setError(false)
                    }
                    change(e.target.value)
                }}
                />
    )
}
