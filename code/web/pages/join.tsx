import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Button, { ButtonType } from "../ACE/Button/Button"
import Input from "../ACE/Input/Input"
import Toast, { ToastType } from "../ACE/Toast/Toast"
import PrivacyDialog from "../components/privacyDialog/PrivacyDialog"
import TermsDialog from "../components/termsDialog/TermsDialog"

export default function Join() {
    // state
    const [phone, setPhone] = useState("")
    const [timezone, setTimezone] = useState("")
    const [privacyDialog, setPrivacyDialog] = useState(true)
    const [terms, setTermsDialog] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [error, setError] = useState({active: false, message: ""})
    const [success, setSuccess] = useState({active: false, message: ""})
    const [loadingVerify, setLoadingVerify] = useState(false)

    // router
    const router = useRouter()

    useEffect(() => {
        console.log(timezone)
    }, [timezone])

    return (
      <>
                  {
                    privacyDialog ? <PrivacyDialog close={() => setPrivacyDialog(false)}/> : <></>
                }
                {
                    terms ? <TermsDialog close={() => setTermsDialog(false)}/> : <></>
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
      <main className="flex flex-col h-screen w-screen text-md justify-center items-center">
   
            <div className="p-4 flex flex-col justify-start h-4/5 w-96 space-y-2 ">

                <div className="flex flex-col space-y-2">
                    <div className="text-4xl flex">
                        Please enter your phone number and area code to join.
                    </div>
                    <div>
                    <select name="timezone" value={timezone} onChange={(e) => {setTimezone(e.target.value)}} id="timezone" className="border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 ">
        <option value="-12">(UTC-12:00) International Date Line West</option>
        <option value="-11">(UTC-11:00) Coordinated Universal Time-11</option>
        <option value="-10">(UTC-10:00) Hawaii</option>
        <option value="-9">(UTC-09:00) Alaska</option>
        <option value="-7">(UTC-08:00) Baja California</option>
        <option value="-7">(UTC-07:00) Pacific Time (US &amp; Canada)</option>
        <option value="-8">(UTC-08:00) Pacific Time (US &amp; Canada)</option>
        <option value="-7">(UTC-07:00) Arizona</option>
        <option value="-6">(UTC-07:00) Chihuahua, La Paz, Mazatlan</option>
        <option value="-6">(UTC-07:00) Mountain Time (US &amp; Canada)</option>
        <option value="-6">(UTC-06:00) Central America</option>
        <option value="-5">(UTC-06:00) Central Time (US &amp; Canada)</option>
        <option value="-5">(UTC-06:00) Guadalajara, Mexico City, Monterrey</option>
        <option value="-6">(UTC-06:00) Saskatchewan</option>
        <option value="-5">(UTC-05:00) Bogota, Lima, Quito</option>
        <option value="-4">(UTC-05:00) Eastern Time (US &amp; Canada)</option>
        <option value="-4">(UTC-05:00) Indiana (East)</option>
        <option value="-4.5">(UTC-04:30) Caracas</option>
        <option value="-4">(UTC-04:00) Asuncion</option>
        <option value="-3">(UTC-04:00) Atlantic Time (Canada)</option>
        <option value="-4">(UTC-04:00) Cuiaba</option>
        <option value="-4">(UTC-04:00) Georgetown, La Paz, Manaus, San Juan</option>
        <option value="-4">(UTC-04:00) Santiago</option>
        <option value="-2.5">(UTC-03:30) Newfoundland</option>
        <option value="-3">(UTC-03:00) Brasilia</option>
        <option value="-3">(UTC-03:00) Buenos Aires</option>
        <option value="-3">(UTC-03:00) Cayenne, Fortaleza</option>
        <option value="-3">(UTC-03:00) Greenland</option>
        <option value="-3">(UTC-03:00) Montevideo</option>
        <option value="-3">(UTC-03:00) Salvador</option>
        <option value="-2">(UTC-02:00) Coordinated Universal Time-02</option>
        <option value="-1">(UTC-02:00) Mid-Atlantic - Old</option>
        <option value="0">(UTC-01:00) Azores</option>
        <option value="-1">(UTC-01:00) Cape Verde Is.</option>
        <option value="1">(UTC) Casablanca</option>
        <option value="0">(UTC) Coordinated Universal Time</option>
        <option value="0">(UTC) Edinburgh, London</option>
        <option value="1">(UTC+01:00) Edinburgh, London</option>
        <option value="1">(UTC) Dublin, Lisbon</option>
        <option value="0">(UTC) Monrovia, Reykjavik</option>
        <option value="2">(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
        <option value="2">(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
        <option value="2">(UTC+01:00) Brussels, Copenhagen, Madrid, Paris</option>
        <option value="2">(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
        <option value="1">(UTC+01:00) West Central Africa</option>
        <option value="1">(UTC+01:00) Windhoek</option>
        <option value="3">(UTC+02:00) Athens, Bucharest</option>
        <option value="3">(UTC+02:00) Beirut</option>
        <option value="2">(UTC+02:00) Cairo</option>
        <option value="3">(UTC+02:00) Damascus</option>
        <option value="3">(UTC+02:00) E. Europe</option>
        <option value="2">(UTC+02:00) Harare, Pretoria</option>
        <option value="3">(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
        <option value="3">(UTC+03:00) Istanbul</option>
        <option value="3">(UTC+02:00) Jerusalem</option>
        <option value="2">(UTC+02:00) Tripoli</option>
        <option value="3">(UTC+03:00) Amman</option>
        <option value="3">(UTC+03:00) Baghdad</option>
        <option value="3">(UTC+02:00) Kaliningrad</option>
        <option value="3">(UTC+03:00) Kuwait, Riyadh</option>
        <option value="3">(UTC+03:00) Nairobi</option>
        <option value="3">(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk</option>
        <option value="4">(UTC+04:00) Samara, Ulyanovsk, Saratov</option>
        <option value="4.5">(UTC+03:30) Tehran</option>
        <option value="4">(UTC+04:00) Abu Dhabi, Muscat</option>
        <option value="5">(UTC+04:00) Baku</option>
        <option value="4">(UTC+04:00) Port Louis</option>
        <option value="4">(UTC+04:00) Tbilisi</option>
        <option value="4">(UTC+04:00) Yerevan</option>
        <option value="4.5">(UTC+04:30) Kabul</option>
        <option value="5">(UTC+05:00) Ashgabat, Tashkent</option>
        <option value="5">(UTC+05:00) Yekaterinburg</option>
        <option value="5">(UTC+05:00) Islamabad, Karachi</option>
        <option value="5.5">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
        <option value="5.5">(UTC+05:30) Sri Jayawardenepura</option>
        <option value="5.75">(UTC+05:45) Kathmandu</option>
        <option value="6">(UTC+06:00) Nur-Sultan (Astana)</option>
        <option value="6">(UTC+06:00) Dhaka</option>
        <option value="6.5">(UTC+06:30) Yangon (Rangoon)</option>
        <option value="7">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
        <option value="7">(UTC+07:00) Novosibirsk</option>
        <option value="8">(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
        <option value="8">(UTC+08:00) Krasnoyarsk</option>
        <option value="8">(UTC+08:00) Kuala Lumpur, Singapore</option>
        <option value="8">(UTC+08:00) Perth</option>
        <option value="8">(UTC+08:00) Taipei</option>
        <option value="8">(UTC+08:00) Ulaanbaatar</option>
        <option value="8">(UTC+08:00) Irkutsk</option>
        <option value="9">(UTC+09:00) Osaka, Sapporo, Tokyo</option>
        <option value="9">(UTC+09:00) Seoul</option>
        <option value="9.5">(UTC+09:30) Adelaide</option>
        <option value="9.5">(UTC+09:30) Darwin</option>
        <option value="10">(UTC+10:00) Brisbane</option>
        <option value="10">(UTC+10:00) Canberra, Melbourne, Sydney</option>
        <option value="10">(UTC+10:00) Guam, Port Moresby</option>
        <option value="10">(UTC+10:00) Hobart</option>
        <option value="9">(UTC+09:00) Yakutsk</option>
        <option value="11">(UTC+11:00) Solomon Is., New Caledonia</option>
        <option value="11">(UTC+11:00) Vladivostok</option>
        <option value="12">(UTC+12:00) Auckland, Wellington</option>
        <option value="12">(UTC+12:00) Coordinated Universal Time+12</option>
        <option value="12">(UTC+12:00) Fiji</option>
        <option value="12">(UTC+12:00) Magadan</option>
        <option value="13">(UTC+12:00) Petropavlovsk-Kamchatsky - Old</option>
        <option value="13">(UTC+13:00) Nuku'alofa</option>
        <option value="13">(UTC+13:00) Samoa</option>
    </select>

                    </div>
                    <Input 
                    error={inputError}
                    setError={setInputError}
                    type='tel'
                    value={phone}
                    change={setPhone}
                    placeholder="Enter you phone number"
                    /> 
                    <Button 
                    type={ButtonType.CONTAINED} 
                    className={`plausible-event-name=send-message flex p-2 rounded-lg items-center justify-center ${loadingVerify ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600 cursor-pointer"}`}
                    click={() => {
                        if (!phone) {
                        setInputError(true)
                        setError({active: true, message: "Please enter a valid phone number."})
                        return
                        }

                        setError({active: true, message: "Not finished yet. Sorry :( -Andrew"})
                    }}>
                        <div>
                        Enter
                        </div>
                    </Button>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Button 
                    click={() => {
                        setPrivacyDialog(true)
                    }}
                  >
                    <div className="flex space-x-2 items-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                      <div>
                        Privacy Policy
                      </div>
                    </div>
                  </Button>
                </div>
                <div className="flex-1">
                  <Button 
                    click={() => {
                        setTermsDialog(true)
                    }}
                  >
                    <div className="flex space-x-2 items-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" /></svg>
                        <div>
                            Terms Of Service
                        </div>
                    </div>
                  </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </main>
    </>
    )

}