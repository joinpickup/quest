import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Badge from "../ACE/Badge/Badge";
import Button, { ButtonType } from "../ACE/Button/Button";
import Input from "../ACE/Input/Input";
import Toast, { ToastType } from "../ACE/Toast/Toast";
import InfoDialog from "../components/infoDialog/InfoDialog";
import { addMessage } from "../helper/message";
import useFingerprint from "../lib/useFingerprint";
import useQuery from "../lib/useQuery";
import { QuestQuestion, QuestStatus } from "../model/quest";

export default function Home() {
  // state
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [success, setSuccess] = useState({ active: false, message: "" });
  const [error, setError] = useState({ active: false, message: "" });
  const [inputError, setInputError] = useState(false);
  const { fingerprint, loading: loadingFingerprint } = useFingerprint();

  // data
  const {
    data: quest,
    error: questionErr,
    refetch: refetchQuery,
  } = useQuery<QuestQuestion>("/api/quest");
  const { data: status, refetch: refreshStatus } = useQuery<QuestStatus>(
    "/api/proxy/quest/status"
  );

  // router
  const router = useRouter();

  return (
    <>
      <Head>
        <title>The Daily Quest</title>
        <meta
          name="description"
          content="A daily challenge to make the lives of the people around you better."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          data-domain="quest.joinpickup.com"
          src="https://analytics.joinpickup.com/js/script.tagged-events.js"
        ></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {info ? <InfoDialog close={() => setInfo(false)} /> : <></>}
      <Toast
        close={() => {
          setError({ active: false, message: "" });
        }}
        isOpen={error.active}
        type={ToastType.ERROR}
        message={error.message}
      ></Toast>
      <Toast
        close={() => {
          setSuccess({ active: false, message: "" });
        }}
        isOpen={success.active}
        type={ToastType.SUCCESS}
        message={success.message}
      ></Toast>
      <main className="flex flex-col h-screen w-screen text-md justify-center items-center">
        <div className="p-4 flex flex-col justify-between h-4/5 w-96 space-y-2 ">
          <div className="flex flex-col space-y-2 ">
            <div className="text-4xl flex">
              {quest?.quest}{" "}
              <span className="text-lg text-green-500">#{quest?.id}</span>
            </div>
            {/* <Button click={() => {
            }}>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                <div>
                  Old Quests
                </div>
              </div>
          </Button> */}
            <Input
              error={inputError}
              setError={setInputError}
              type="tel"
              value={phone}
              change={setPhone}
              placeholder="Enter their phone number"
            />
            <Button
              type={ButtonType.CONTAINED}
              className={`plausible-event-name=send-message flex p-2 rounded-lg items-center justify-center ${
                loadingAdd
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-green-500 hover:bg-green-600 cursor-pointer"
              }`}
              click={() => {
                if (!phone) {
                  setInputError(true);
                  setError({
                    active: true,
                    message: "Please enter a valid phone number.",
                  });
                  return;
                }

                let message = {
                  fingerprint,
                  quest: quest?.quest as string,
                  status: "queued",
                  phone,
                };

                setLoadingAdd(true);
                addMessage(message)
                  .then(() => {
                    setPhone("");
                    refreshStatus();
                    setSuccess({ active: true, message: "Message submitted." });
                    setLoadingAdd(false);
                    setInputError(false);
                  })
                  .catch((err) => {
                    setInputError(true);
                    setError({ active: true, message: err.toString() });
                    setLoadingAdd(false);
                  });
              }}
            >
              <div>Enter</div>
            </Button>
            <div>
              <Button
                click={() => {
                  router.push("/join");
                }}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>Join</div>
                </div>
              </Button>
            </div>
            <div className="text-lg flex justify-between">
              <div>Community messages remianing</div>
              <div className="text-orange-400">{status?.remaining}</div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="flex-1">
                <Button
                  click={() => {
                    refreshStatus();
                    refetchQuery();
                    setSuccess({ active: true, message: "Refreshed." });
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>Refresh</div>
                  </div>
                </Button>
              </div>
              <div className="flex-1">
                <a
                  className="plausible-event-name=buy-message"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={status?.payment_link}
                  onClick={() => {}}
                >
                  <Button click={() => {}}>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>Add More</div>
                    </div>
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex-1 flex items-center justify-between">
              <div>Other Information</div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Button
                  click={() => {
                    setInfo(true);
                  }}
                >
                  <div className="flex space-x-2 items-center">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>The Daily Quest</div>
                    <Badge text="Alpha"></Badge>
                  </div>
                </Button>
              </div>
              {/* <div>
                  <Button click={() => {
                  }}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      <div>
                        Privacy
                      </div>
                    </div>
                  </Button>
                </div> */}
            </div>
            <Button
              className={
                "plausible-event-name=other-apps flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-gray-600 hover:bg-gray-600 w-full"
              }
              click={() => {
                router.push(
                  "https://joinpickup.com?utm_source=daily_quest&utm_medium=link&utm_campaign=daily_quest"
                );
              }}
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>Our Other Apps</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
