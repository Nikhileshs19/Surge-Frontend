// src/components/core/CompressorLink.tsx
import Link from "next/link"
import { getLinkClass, getIconWrapperClass, getLabelClass } from "@/utils/compressorUtils"
type Prop = {
  id: number
  iconClass?: string | null
  name: string
  selectedCompressorId: number
}

export function CompressorLink({ id, selectedCompressorId, iconClass, name }: Prop) {
  const isActive = id == selectedCompressorId

  return (
    <div>
      <Link
        href={`/compressors/${id}`}
        className={` px-5 py-1 rounded-full flex items-center gap-2.5 transition border h-7 ${
          isActive ? "bg-active text-text border-color" : "border-text/40 hover:bg-text/10"
        } min-w-[170px]`}
      >
        {iconClass && (
          <span
            className={`rounded-full p-1 flex items-center justify-center ${
              isActive ? "bg-text/20" : ""
            }`}
          >
            <i className={`${iconClass} text-base`} />
          </span>
        )}

        <span
          className={`w-full text-center text-sm font-medium  ${
            isActive ? "text-black" : "text-text"
          }`}
        >
          {name}
        </span>
      </Link>
    </div>
  )
}
