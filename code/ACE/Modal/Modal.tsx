import { Close } from "@mui/icons-material"
import React, { useEffect } from "react"
import Button from "../Button/Button"


interface ModalProps {
    close: VoidFunction
    title: string
    closable: boolean
    open: boolean
    children?: JSX.Element
}

export default function Modal({closable, close, open, title, children}:ModalProps) {
    useEffect(() => {
        if(open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [open])
    
    return (
        <>
            <div className={`fixed inset-0 bg-black/60 flex w-full h-full z-50 ${open ? "" : "hidden"} overscroll-x-none overscroll-y-none md:inset-0 h-modal md:h-full`}>
                <div className="p-4 flex w-full h-full justify-center items-center backdrop-blur-lg">
                    <div className="flex p-4 flex-col w-full relative rounded-lg bg-gray-700 space-y-4">
                        <div className="flex items-center justify-end">
                            <div className="flex-1 text-xl">
                                {title}
                            </div>
                        { 
                            closable ? 
                                <Button 
                                    click={close}
                                >
                                    <Close />
                                </Button>
                            : <></> }
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}