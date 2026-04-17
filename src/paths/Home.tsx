import { useContext, useState, useEffect, useRef } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Blob from '../Blob';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import Info from '../Info';
import { SelectedContext } from '../contexts/SelectedContext';
import { formatInterval } from '../storage';


export default function Home() {
  const { selected } = useContext(SelectedContext);
  const timerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [usedPhrases, setUsedPhrases] = useState<Set<string>>(new Set());

  useEffect(() => {
    const schedule = () => {
      if (!isPlaying || !selected) {
        setTimeLeft(null);
        return;
      }
      const min = selected.interval.min;
      const max = selected.interval.max;
      const delay = Math.floor(Math.random() * (max - min) + min);
      setTimeLeft(delay);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const phrasesToUse = selected.forceFullUseBeforeLoop
          ? (new Set(selected.phrases)).difference(usedPhrases)
          : new Set(selected.phrases);
        const phraseIndex = selected.randomize
          ? Math.floor(Math.random() * phrasesToUse.size)
          : 0;
        const phrase = new Array(...phrasesToUse)[phraseIndex];
        // speak
        speechSynthesis.speak(new SpeechSynthesisUtterance(`Now ${phrase}`));
        // show
        setPhrase(phrase);
        setTimeout(() => setPhrase(null), 3 * 1000);
        // track used
        setUsedPhrases((prev) => prev.size == selected.phrases.length - 1 ? new Set() : new Set([...prev, phrase]));
        if (isPlaying) schedule();
      }, delay * 1000);
    };
    schedule();
    const countdown = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(countdown);
    };
  }, [isPlaying, selected, usedPhrases]);


  const togglePlay = () => {
    if (!isPlaying) speechSynthesis.speak(new SpeechSynthesisUtterance("Start"));
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-pulse-bg flex flex-col items-center justify-center gap-10 p-10 relative overflow-hidden font-sans">
      {/* Marketplace */}
      <a href='#/marketplace' className="absolute top-4 right-4 text-pulse-accent border border-2 rounded-lg p-2 hover:scale-[1.02] transition-all">
        <AiOutlineAppstoreAdd size={35} />
      </a>
      {/* Header */}
      <header className="w-full text-center text-5xl text-pulse-accent font-extrabold">
        Pulse
      </header>
      {/* blob */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <Blob style={{ opacity: timeLeft !== null ? 0.8 : 1.0, scale: phrase ? 1.5 : 1.0 }} />
        <div className="absolute top-1/2 -translate-y-[25%] text-white">
          {timeLeft && !phrase ? `Next in ${timeLeft > 60 ? Math.floor(timeLeft / 60) + 'm' : ''} ${Math.floor(timeLeft % 60)}s` : ''}
        </div>
        <div className="absolute top-1/2 -translate-y-[25%] text-white text-center w-[80%] font-extrabold text-5xl">
          {phrase}
        </div>
      </div>
      {/* play / pause */}
      <button
        onClick={togglePlay}
        disabled={!selected} // if no plan set
        className={`
            flex items-center justify-center rounded-full text-pulse-accent p-3 mb-10
            hover:scale-[1.1] transition-all cursor-pointer
            disabled:text-gray-300 disabled:cursor-not-allowed disabled:transform-none
          `}
      >
        {isPlaying ? <FaCirclePause size={75} /> : <FaCirclePlay size={75} />}
      </button>
      {/* info */}
      {selected
        ? <Info text={`Selected "${selected.name}"
        (${selected.phrases.length} different phrases every ${formatInterval(selected.interval.min, selected.interval.max)})`} />
        : <Info text="Select set to start playing" />
      }
    </div >
  );
};
