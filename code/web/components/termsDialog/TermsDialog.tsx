import React from "react";
import Badge from "../../ACE/Badge/Badge";
import Button from "../../ACE/Button/Button";

interface InfoDialogProps {
  close: Function;
}

export default function TermsDialog({ close }: InfoDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overscroll-x-none overscroll-y-none md:inset-0">
      <div className="p-4 flex h-full w-screen justify-center m-0 items-center backdrop-blur-lg">
        <div className="flex p-4 flex-col h-4/5 w-96 rounded-lg bg-gray-700 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 w-full flex flex-col text-xl">
              <div>Terms Of Service</div>
            </div>
            <Button
              className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-600 hover:bg-gray-600"
              click={() => {
                close();
              }}
            >
              <div>Close</div>
            </Button>
          </div>
          <div className="flex flex-col space-y-2 overflow-auto">
            <div className="text-lg">
              By verifying your phone number you agree to let The Daily Quest:
            </div>
            <ul className="flex flex-col space-y-2">
              <li className="rounded-lg p-2 bg-gray-600">
                Send you a message with the phone number: +1 (757) 835-3913
                whenever someone chooses you for the prompt.
              </li>
              <li className="rounded-lg p-2 bg-gray-600">
                Opt out{" "}
                <a href="/leave" className="hover:underline text-orange-400">
                  here.
                </a>
              </li>
              <li className="rounded-lg p-2 bg-gray-600">
                That{"'"}s it, it{"'"}s pretty simple.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
