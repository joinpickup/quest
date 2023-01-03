import React from "react";

export default function Skelaton() {
    return (
        <div className="flex flex-col space-y-2 justify-center h-12 bg-gray-500 p-2 rounded-lg animate-pulse">
            <div className="flex rounded-lg h-2 w-5/6 bg-gray-600">
            </div>
            <div className="flex rounded-lg h-2 w-full bg-gray-600">
            </div>
        </div>
    )

}