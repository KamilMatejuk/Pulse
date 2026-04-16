import { useState } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Blob from './Blob';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';


export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-pulse-bg flex flex-col items-center justify-center gap-10 p-10 relative overflow-hidden font-sans">
      {/* Marketplace */}
      <a href='/marketplace' className="absolute top-4 right-4 text-pulse-accent border border-2 rounded-lg p-2 hover:scale-[1.02] transition-all">
        <AiOutlineAppstoreAdd size={35} />
      </a>
      {/* Header */}
      <header className="w-full text-center text-5xl text-pulse-accent font-extrabold">
        Pulse
      </header>
      {/* blob */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Blob />
      </div>
      {/* play / pause */}
      <button
        onClick={togglePlay}
        disabled={false} // if no plan set
        className={`
            flex items-center justify-center rounded-full text-pulse-accent p-3
            hover:scale-[1.1] transition-all cursor-pointer
            disabled:text-gray-300 disabled:cursor-not-allowed disabled:transform-none
          `}
      >
        {isPlaying ? <FaCirclePause size={50} /> : <FaCirclePlay size={50} />}
      </button>
      {/* info */}
      <div className="flex flex-col items-center justify-center border border-black/5 text-black/40 bg-black/5 rounded-lg px-10 py-2 ">
        Select set to start playing
      </div >
    </div >
  );
};
