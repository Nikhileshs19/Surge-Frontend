export const getLinkClass = (isActive: boolean): string =>
    `px-5 py-1 rounded-full flex items-center gap-2.5 transition border h-7 ${
    isActive ? "bg-active text-text border-color" : "border-text/40 hover:bg-text/10"
}`;

export const getIconWrapperClass = (isActive: boolean): string =>
`rounded-full p-1 flex items-center justify-center ${isActive ? "bg-text/20" : ""}`;

export const getLabelClass = (isActive: boolean): string =>
`text-sm font-medium justify-center font-poppins ${isActive ? "text-black" : "text-text"}`;

