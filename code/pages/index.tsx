import Head from 'next/head'
import { useState } from 'react'
import Button, { ButtonType } from '../ACE/Button/Button'
import Input from '../ACE/Input/Input'

export default function Home() {
  const [phone, setPhone] = useState("")
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
      <main className="flex h-screen w-screen justify-center items-center">
        <div className="p-4 flex flex-col space-y-2 ">
          <div className="text-xl">
            {quest}
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
}
