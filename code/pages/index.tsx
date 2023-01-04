import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Badge from '../ACE/Badge/Badge'
import Button, { ButtonType } from '../ACE/Button/Button'
import Input from '../ACE/Input/Input'
import Toast, { ToastType } from '../ACE/Toast/Toast'
import useQuery from '../lib/useQuery'

export default function Home() {
  // state
  const [phone, setPhone] = useState("")
  const [messages, setMessages] = useState(1000)
  const [info, setInfo] = useState(true)
  const [success, setSuccess] = useState({active: false, message: ""})
  const [error, setError] = useState({active: false, message: ""})

  // data
  const {data: question, loading} = useQuery<string>("/api/get_question")

  // router
  const router = useRouter();

  return (
    <>
      <Head>
        <title>The Daily Quest</title>
        <meta name="description" content="A daily challenge to make the lives of the people around you better." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script defer data-domain="quest.joinpickup.com" src="https://analytics.joinpickup.com/js/script.js"></script>
      </Head>
      {
        info ? <InfoDialog /> : <></>
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
                router.push("https://joinpickup.com?utm_source=daily_quest&utm_medium=link&utm_campaign=daily_quest")
              }}
            >
              <div>Our Other Apps</div>
            </Button>
          </div>
          <div className="flex flex-col space-y-2 ">
            <div className="text-3xl">
              {question}
            </div>
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

              setMessages(messages - 1)
              setPhone("")
              setSuccess({active: true, message: "Message submitted."})
            }}>
              <div>
                Enter
              </div>
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex-1 flex items-center justify-between">
              <div>Community messages left </div>
              <div className="text-2xl text-orange-400">{messages}</div>
            </div>
            <a className="text-sm" target="_blank" rel="noopener noreferrer" href="https://buy.stripe.com/bIYaIB2S2bZ35bidQR">
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
  
  function InfoDialog() {
    return (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overscroll-x-none overscroll-y-none md:inset-0">
                  <div className="p-4 flex h-full w-screen justify-center m-0 items-center backdrop-blur-lg">
                      <div className="flex p-4 flex-col h-4/5 w-96 rounded-lg bg-gray-700 space-y-4">
                          <div className="flex items-center justify-end space-x-2">
                              <div className="flex-1 flex flex-col text-xl">
                                <div>What is the Daily Quest</div>
                                <Badge text='Beta' />
                              </div>
                              <Button click={() => {
                                setInfo(false)
                              }}>
                                <div>Close</div>
                              </Button>
                          </div>
                          <div className="flex flex-col space-y-2 overflow-auto">
                            <div className="text-md">
                              We have noticed that the endless scrolling of social media 
                              has had negative effects for our collective mental health. Primarily by
                              causing us to feel disconnected from our support systems. So we created a challenge
                              to help people feel more connected. 
                              <br />
                              <span className="text-green-300 italic">-The Pickup Team</span>
                            </div>
                            <div className="text-xl">
                              How it works
                            </div>
                            <ul className="flex flex-col space-y-2">
                              <li className="rounded-lg p-2 bg-gray-600">There is one hand picked question a day.</li>
                              <li className="rounded-lg p-2 bg-gray-600">Enter the person in your life who best matches the question.</li>
                              <li className="rounded-lg p-2 bg-gray-600">The day starts with <span className="text-orange-500 italic">1000</span> free messages for the entire community.</li>
                              <li className="rounded-lg p-2 bg-gray-600">After that anyone can buy messages for the community at <span className="text-orange-500 italic">10 cents</span> a message.</li>
                              <li className="rounded-lg p-2 bg-gray-600">Messages get sent out anonymously at the end of the day.</li>
                            </ul>
                            <div className="text-xl">
                              Example message
                            </div>
                            <ul className="flex flex-col space-y-2">
                              <li className="rounded-lg p-2 bg-gray-600">
                                Someone chose you for the Daily Quest.
                                <br />
                                <br />
                                Who do you feel the most comfortable around?
                                <br />
                                <br />
                                Go to quest.joinpickup.com for info on how to play.
                              </li>
                            </ul>
                          </div>
                      </div>
                  </div>
              </div>
    )
  }

}