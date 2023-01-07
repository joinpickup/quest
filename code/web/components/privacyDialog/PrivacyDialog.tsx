import React from "react"
import Badge from "../../ACE/Badge/Badge"
import Button from "../../ACE/Button/Button"

interface InfoDialogProps {
    close: Function,
}

export default function PrivacyDialog({close}: InfoDialogProps) {
    return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overscroll-x-none overscroll-y-none md:inset-0">
                <div className="p-4 flex h-full w-screen justify-center m-0 items-center backdrop-blur-lg">
                    <div className="flex p-4 flex-col h-4/5 w-96 rounded-lg bg-gray-700 space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 w-full flex flex-col text-xl">
                                <div>Privacy Policy</div>
                            </div>
                            <Button 
                            className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-600 hover:bg-gray-600"
                            click={() => {
                                close()
                            }}>
                                <div>Close</div>
                            </Button>
                        </div>
                        <div className="flex flex-col space-y-2 overflow-auto">
                            <ul className="flex flex-col space-y-2">
                                <li className="rounded-lg p-2 bg-gray-600">No one will be able to send you a message unless you opt in.</li>
                                <li className="rounded-lg p-2 bg-gray-600">If you opt in. We store an encrypted version of your phone number.</li>
                                <li className="rounded-lg p-2 bg-gray-600">Due to the nature of the app, we must store your phone number till the message gets sent at the end of the day. This is a max of 24 hours.</li>
                                <li className="rounded-lg p-2 bg-gray-600">We do not sell your phone numbers. Selling user data goes against everything we stand for.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}