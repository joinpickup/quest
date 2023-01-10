import React from "react";
import Badge from "../../ACE/Badge/Badge";
import Button from "../../ACE/Button/Button";

interface InfoDialogProps {
  close: Function;
}
export default function InfoDialog({ close }: InfoDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overscroll-x-none overscroll-y-none md:inset-0">
      <div className="p-4 flex h-full w-screen justify-center m-0 items-center backdrop-blur-lg">
        <div className="flex p-4 flex-col h-4/5 w-96 rounded-lg bg-gray-700 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 w-full flex flex-col text-xl">
              <div>What is the Daily Quest</div>
              <Badge text="Beta" />
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
            <div className="text-md">
              We have noticed that the endless scrolling of social media has had
              negative effects for our collective mental health. Primarily by
              causing us to feel disconnected from our support systems. So we
              created a challenge to help people feel more connected.
              <br />
              <span className="text-green-300 italic">-The Pickup Team</span>
            </div>
            <div className="text-xl">How it works</div>
            <ul className="flex flex-col space-y-2">
              <li className="rounded-lg p-2 bg-gray-600">
                There is one hand picked prompt a day.
              </li>
              <li className="rounded-lg p-2 bg-gray-600">
                Enter the person in your life who best matches the prompt.
              </li>
              <li className="rounded-lg p-2 bg-gray-600">
                The day starts with{" "}
                <span className="text-orange-500 italic">1000</span> free
                messages for the entire community.
              </li>
              <li className="rounded-lg p-2 bg-gray-600">
                After that anyone can buy messages for the community at{" "}
                <span className="text-orange-500 italic">10 cents</span> a
                message.
              </li>
              <li className="rounded-lg p-2 bg-gray-600">
                Messages get sent out from the Daily Quest number once per day.
              </li>
            </ul>
            <div className="text-xl">Example Message That We Send</div>
            <ul className="flex flex-col space-y-2">
              <li className="rounded-lg p-2 bg-gray-600">
                You were chosen for today's Daily Quest. 
                <br />
                <br />
                Go to https://quest.joinpickup.com to see the prompt.
                Someone chose you for the Daily Quest.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
