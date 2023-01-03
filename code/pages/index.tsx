import Head from 'next/head'
import { useState } from 'react'
import Button, { ButtonType } from '../ACE/Button/Button'
import Input from '../ACE/Input/Input'

export default function Home() {
  const [phone, setPhone] = useState("")
  const [info, setInfo] = useState(true)
  const [quest, setQuest] = useState("Who do you feel most comfortable with?")

  return (
    <>
      <Head>
        <title>The Daily Quest</title>
        <meta name="description" content="The daily quest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script defer data-domain="quest.joinpickup.com" src="https://analytics.joinpickup.com/js/script.js"></script>
      </Head>
      {
        info ? <InfoDialog /> : <></>
      }
      <main className="flex h-screen w-screen justify-center items-center">
        <div className="p-4 flex flex-col space-y-2 ">
          <div className='flex space-x-2'>
            <div className="text-3xl">
              {quest}
            </div>
            <div>
              <Button 
                click={() => {
                  setInfo(true)
                }}
              >
                <div>Info</div>
              </Button>
            </div>
          </div>
          <div className="flex md:flex-row flex-col space-x-0 space-y-2 md:space-y-0 md:space-x-2">
            <Input 
              type='tel'
              value={phone}
              change={setPhone}
              placeholder="Please enter someone's phone number."
            /> 
            <Button 
            type={ButtonType.CONTAINED} 
            className="flex p-2 rounded-lg cursor-pointer items-center justify-center bg-green-500 hover:bg-green-600"
            click={() => {
              alert("not finished yet")
            }}>
              <div>
                Enter
              </div>
            </Button>
          </div>

        </div>
      </main>
    </>
  )
  
  function InfoDialog() {
    return (
              <div className="fixed inset-0 bg-black/60 flex w-screen items-center justify-center h-full z-50 overscroll-x-none overscroll-y-none md:inset-0 h-modal md:h-full">
                  <div className="p-4 flex w-full h-full justify-center m-0 max-w-lg items-center backdrop-blur-lg">
                      <div className="flex p-4 flex-col w-full relative rounded-lg bg-gray-700 space-y-4">
                          <div className="flex items-center justify-end">
                              <div className="flex-1 text-xl">
                                What is the Daily Quest?
                              </div>
                              <Button click={() => {
                                setInfo(false)
                              }}>
                                <div>Close</div>
                              </Button>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="text-md">
                              We live in an age of endless scrolling. It{"'"}s abundantly clear 
                              that has had negative outcome for our mental mental health and has caused used to feel disconnected from our support system. 
                              Games like wordle and apps like BeReel have attemted to do it better with daily challenges. 
                              This is our attempt at that. 
                            </div>
                            <div className="text-xl">
                              How it works?
                            </div>
                            <ul className="flex flex-col space-y-2">
                              <li className="rounded-lg p-2 bg-gray-600">There is one hand picked question a day.</li>
                              <li className="rounded-lg p-2 bg-gray-600">The day starts with <span className="text-orange-500 italic">1000</span> messages for the entire community.</li>
                              <li className="rounded-lg p-2 bg-gray-600">Anyone can buy messages for the community at <span className="text-orange-500 italic">10 cents</span> a message.</li>
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