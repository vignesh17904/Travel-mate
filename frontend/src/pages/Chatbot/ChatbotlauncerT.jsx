import { useState } from "react";
import { MdSmartToy } from "react-icons/md"; // AI bot icon
import ChatbotWindowT from "./ChatbotWindowT";

export default function ChatbotLauncherT() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-xl z-50 hover:bg-blue-700 flex flex-col items-center text-center"
      >
        <MdSmartToy size={28} className="mb-1" />
        <span className="text-xs font-medium leading-tight">
          Need help? <br /> Ask TravelBuddy
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
          <ChatbotWindowT onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
