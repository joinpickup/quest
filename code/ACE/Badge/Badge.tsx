import React from "react"

interface BadgeProps {
    className?: string
    text?: string
}

export default function Badge({className, text}: BadgeProps) {
    return(
        <>
            <div className={className ?? "text-xs font-semibold px-2 py-1 rounded bg-gray-700"}>
                {text}
            </div>
        </>
    )
}