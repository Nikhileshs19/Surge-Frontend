"use client"
import dayjs from "dayjs"
import Image from "next/image"
import { useState } from "react"
import ingeneroLogo from "../../../public/images/ingenero.svg"
import westlakeLogo from "../../../public/images/logo2.svg"
import questionIcon from "../../../public/images/question-mark.svg"
import fullscreenIcon from "../../../public/images/arrows-maximize.svg"
import { toggleFullscreen } from "@/utils/dom-utils"
import { useLastRunTimeQuery } from "@/services/api/compressor-api"
import { useHelpOverlay } from "@/context/help-overlay-context"
export default function AppHeader() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { setShowHelp } = useHelpOverlay()
  const { data: lastRunTime } = useLastRunTimeQuery()

  return (
    <header className="text-white flex items-center justify-between rounded-t-2xl  ">
      <div className="flex items-center gap-5">
        <h1 className="text-lg font-medium">
          {`PLQ VCM Refrigeration Compressor (RE-501) Surge Analysis`}
        </h1>
        <div className="py-1 px-4 rounded-[5px] inline-flex justify-center items-center gap-2.5 bg-[#26293C]">
          <span className="justify-start text-xs font-normal">
            {`Last Updated Timestamp: ${
              lastRunTime ? dayjs(lastRunTime).format("DD-MMM-YYYY HH:mm") : ""
            }`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="transition-transform transform hover:scale-110 hover:opacity-80 rounded-[5px] focus:outline-none"
            onClick={() => setShowHelp(true)}
          >
            <Image src={questionIcon} alt="icon 1" className="rounded-[5px] w-7 h-7" />
          </button>
          <button
            onClick={() => {
              toggleFullscreen(isFullscreen, setIsFullscreen)
            }}
            type="button"
            className="transition-transform transform hover:scale-110 hover:opacity-80  rounded-[5px] focus:outline-none bg-[#26293C]"
          >
            <Image src={fullscreenIcon} alt="icon 2" className="rounded-[5px] w-5 h-5" />
          </button>
          <button
            type="button"
            className=" transition-transform transform hover:scale-110 hover:opacity-80 rounded-[5px] focus:outline-none"
          >
            {/* <Image src={powerbtnIcon} alt="icon 3" className="rounded-[5px] w-9 h-9" /> */}
          </button>
        </div>
        <div className="mx-2 border-l border-white h-7" />
        <Image src={westlakeLogo} alt="Logo 2" className="h-3 w-16" />
        <Image src={ingeneroLogo} alt="Logo 1" className="w-28 h-10 relative" />
      </div>
    </header>
  )
}
