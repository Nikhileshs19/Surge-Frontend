import React from "react";

type AlertModalProps = {
  section?: string | number;
  currentOpening: number;
  setShowAlert: (val: boolean) => void;
};

const AlertModal: React.FC<AlertModalProps> = ({ section, currentOpening, setShowAlert }) => {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative bg-[#1F1E30] text-white p-4 rounded-lg shadow-xl max-w-sm w-[90%] space-y-2.5">
        <button
          onClick={() => setShowAlert(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <p className=" font-semibold">⚠️ Alert</p>
        <p className="text-white text-xs font-light tracking-tight">
          Surge Margin for Section {section} is low (&lt;10%) consider opening
          recycle valve i.e. <b>FC_4079.OP</b> (Current Opening: {currentOpening}%)
        </p>
        <button
          className="text-white px-2.5 py-1.5 rounded hover:bg-white text-xs hover:text-black w-32 h-7 border border-white group flex justify-center"
          onClick={() => setShowAlert(false)}
        >
          <i className="pi pi-check pr-2 text-xs group-hover:text-black text-white"></i>
          Acknowledge
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
