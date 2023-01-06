import { usePlausible } from 'next-plausible'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Badge from '../ACE/Badge/Badge'
import Button, { ButtonType } from '../ACE/Button/Button'
import Input from '../ACE/Input/Input'
import Toast, { ToastType } from '../ACE/Toast/Toast'
import InfoDialog from '../components/infoDialog/InfoDialog'
import { addMessage } from '../helper/message'
import useFingerprint from '../lib/useFingerprint'
import useQuery from '../lib/useQuery'
import { QuestStatus } from '../model/quest'

export default function Home() {
  // state
  const [phone, setPhone] = useState("")
  const [info, setInfo] = useState(true)
  const [success, setSuccess] = useState({active: false, message: ""})
  const [error, setError] = useState({active: false, message: ""})
  const {fingerprint, loading: loadingFingerprint} = useFingerprint();
  const plausible = usePlausible();

  // data
  const {data: quest, error: questionErr, refetch: refetchQuery} = useQuery<string>("/api/question")
  const {data: status, refetch: refreshStatus} = useQuery<QuestStatus>("/api/proxy/quest/status")

  // router
  const router = useRouter();

  return (
    <>
      <Head>
        <title>The Daily Quest</title>
        <meta name="description" content="A daily challenge to make the lives of the people around you better." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer data-domain="quest.joinpickup.com" src="https://analytics.joinpickup.com/js/script.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        info ? <InfoDialog close={() => setInfo(false)}/> : <></>
      }
      <Toast 
          close={() => {setError({active: false, message: ""})}}
          isOpen={error.active}
          type={ToastType.ERROR}
          message={error.message}
        ></Toast>
      <Toast 
          close={() => {setSuccess({active: false, message: ""})}}
          isOpen={success.active}
          type={ToastType.SUCCESS}
          message={success.message}
        ></Toast>
      <main className="flex flex-col h-screen w-screen justify-center items-center">
        <div className="p-4 flex flex-col justify-between h-4/5 w-96 space-y-2 ">
          <div className="flex flex-col space-y-2">
            <Button 
              click={() => {
                setInfo(true)
              }}
            >
              <div className="flex space-x-2 items-center">
                <div>
                  The Daily Quest
                </div>
                <Badge text='Beta'></Badge>
              </div>
            </Button>
            <Button 
              click={() => {
                plausible("other-apps")
                router.push("https://joinpickup.com?utm_source=daily_quest&utm_medium=link&utm_campaign=daily_quest")
              }}
            >
              <div>Our Other Apps</div>
            </Button>
          </div>
          <div className="flex flex-col space-y-2 ">
            <div className="text-3xl">
              {quest}
            </div>
            {
              status?.can_message ? <>
                <Input 
                  type='tel'
                  value={phone}
                  change={setPhone}
                  placeholder="Enter their phone number"
                /> 
                <Button 
                type={ButtonType.CONTAINED} 
                className="flex p-2 rounded-lg cursor-pointer items-center justify-center bg-green-500 hover:bg-green-600"
                click={() => {
                  if (!phone) {
                    setError({active: true, message: "Please enter a valid phone number."})
                    return
                  }

                  plausible("send-message")
                  let message = {
                    fingerprint,
                    quest: quest as string,
                    status: "queued",
                    phone
                  }

                  addMessage(message).catch(err => {
                    setError({active: true, message: err.toString()})
                  }).then(() => {
                    setPhone("")
                    refreshStatus()
                    setSuccess({active: true, message: "Message submitted."})
                  })
                }}>
                  <div>
                    Enter
                  </div>
                </Button>
              </> : <>
                <div className="text-xl">
                  {status?.message}
                </div>
              </>
            }
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex-1 flex items-center justify-between">
              <div>Community messages remaining</div>
              <div className="text-2xl text-orange-400">{status?.remaining}</div>
            </div>
            <Button click={() => {
              refreshStatus()
            }}>
              <div>
                Refresh
              </div>
            </Button>
            <a target="_blank" rel="noopener noreferrer" href="https://buy.stripe.com/bIYaIB2S2bZ35bidQR" onClick={() => {
              alert("STILL IN DEVELOPMENT: SPENDING MONEY WILL NOT GET YOU ANYTHING")
              plausible("send-message")
            }}>
              <Button click={() => {
              }}>
                <div>
                  Add More
                </div>
              </Button>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}