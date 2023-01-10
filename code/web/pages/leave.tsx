import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Badge from "../ACE/Badge/Badge";
import Button, { ButtonType } from "../ACE/Button/Button";
import Input from "../ACE/Input/Input";
import Toast, { ToastType } from "../ACE/Toast/Toast";
import InfoDialog from "../components/infoDialog/InfoDialog";
import PrivacyDialog from "../components/privacyDialog/PrivacyDialog";
import TermsDialog from "../components/termsDialog/TermsDialog";
import { sendOTP, verifyOTP } from "../helper/quest";

export default function Leave() {
  // state
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [page, setPage] = useState(0);
  const [privacyDialog, setPrivacyDialog] = useState(false);
  const [terms, setTermsDialog] = useState(false);
  const [info, setInfo] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState({ active: false, message: "" });
  const [success, setSuccess] = useState({ active: false, message: "" });
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  // router
  const router = useRouter();

  return (
    <>
      {privacyDialog ? (
        <PrivacyDialog close={() => setPrivacyDialog(false)} />
      ) : (
        <></>
      )}
      {terms ? <TermsDialog close={() => setTermsDialog(false)} /> : <></>}
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
        {page == 0 ? (
          <div className="p-4 flex flex-col justify-start h-4/5 w-96 space-y-2 ">
            <div className="flex flex-col space-y-2">
              <div className="text-4xl flex">
                Please enter your phone number to leave.
              </div>
              <Input
                error={inputError}
                setError={setInputError}
                type="tel"
                value={phone}
                change={setPhone}
                placeholder="Enter you phone number"
              />
              <Button
                type={ButtonType.CONTAINED}
                className={`plausible-event-name=send-message flex p-2 rounded-lg items-center justify-center ${
                  loadingSend
                    ? "bg-gray-500 cursor-pointer"
                    : "bg-green-500 hover:bg-green-600 cursor-pointer"
                }`}
                click={() => {
                  if (loadingSend) {
                    return;
                  }

                  if (!phone) {
                    setInputError(true);
                    setError({
                      active: true,
                      message: "Please enter a valid phone number.",
                    });
                    return;
                  }

                  // send verification code
                  setLoadingSend(true);
                  sendOTP(phone, "leave")
                    .then((res) => {
                      // go to next page with terms dialog set and reset state
                      setOTP("");
                      setPage(page + 1);
                      setTermsDialog(true);
                      setLoadingSend(false);
                      setLoadingVerify(false);
                    })
                    .catch((err) => {
                      setOTP("");
                      setPhone("");
                      setInputError(true);
                      setError({
                        active: true,
                        message: err.toString(),
                      });
                      setLoadingSend(false);
                      return;
                    });
                }}
              >
                <div>Enter</div>
              </Button>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Button
                      click={() => {
                        setPrivacyDialog(true);
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
                        <div>Privacy Policy</div>
                      </div>
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Button
                      click={() => {
                        setTermsDialog(true);
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
                            d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>Terms Of Service</div>
                      </div>
                    </Button>
                  </div>
                </div>

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
                      <Badge text="Beta"></Badge>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : page == 1 ? (
          <>
            <div className="p-4 flex flex-col justify-start h-4/5 w-96 space-y-2 ">
              <div className="flex flex-col space-y-2">
                <div className="text-4xl flex">
                  Enter the verification code we send to your phone.
                </div>
                <Button
                  className="flex p-2 rounded-lg cursor-pointer justify-center items-center border-2 border-green-400 hover:bg-green-400 text-green-400 hover:text-gray-600 w-full"
                  click={() => {
                    setPage(page - 1);
                  }}
                >
                  <div>Cancel</div>
                </Button>
                {loadingSend || loadingVerify ? (
                  <></>
                ) : (
                  <Button
                    click={() => {
                      if (loadingSend || loadingVerify) {
                        return;
                      }

                      setLoadingSend(true);
                      setLoadingVerify(true);
                      sendOTP(phone, "leave")
                        .then((res) => {
                          setLoadingSend(false);
                          setLoadingVerify(false);
                        })
                        .catch((err) => {
                          setInputError(true);
                          setError({
                            active: true,
                            message: err.toString(),
                          });
                          setLoadingVerify(false);
                          setLoadingSend(false);
                          return;
                        });
                    }}
                  >
                    <div>Send Again</div>
                  </Button>
                )}
                <Input
                  error={inputError}
                  setError={setInputError}
                  value={OTP}
                  change={setOTP}
                  placeholder="Enter the code..."
                />
                <Button
                  type={ButtonType.CONTAINED}
                  className={`plausible-event-name=leave flex p-2 rounded-lg items-center justify-center ${
                    loadingVerify
                      ? "bg-gray-500 cursor-default"
                      : "bg-red-400 hover:bg-red-500 text-gray-600 tecursor-pointer"
                  }`}
                  click={() => {
                    if (loadingVerify) {
                      return;
                    }
                    if (!OTP) {
                      setInputError(true);
                      setError({
                        active: true,
                        message: "Please enter a code.",
                      });
                      return;
                    }

                    setLoadingVerify(true);
                    verifyOTP(phone, OTP, "leave")
                      .then(() => {
                        setSuccess({
                          active: true,
                          message: "Succesfully left.",
                        });
                        setTimeout(() => {
                          router.push("/");
                        }, 500);
                      })
                      .catch((err) => {
                        setPage(0);
                        setOTP("");
                        setPhone("");
                        setLoadingVerify(false);
                        setLoadingSend(false);
                        setInputError(true);
                        setError({
                          active: true,
                          message: err.toString(),
                        });
                        return;
                      });
                  }}
                >
                  <div>Leave The Daily Quest</div>
                </Button>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Button
                        click={() => {
                          setPrivacyDialog(true);
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
                          <div>Privacy Policy</div>
                        </div>
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button
                        click={() => {
                          setTermsDialog(true);
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
                              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>Terms Of Service</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
