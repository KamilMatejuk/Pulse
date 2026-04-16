import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { type Set } from "./storage";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext } from "react";
import { SetsContext } from "./contexts/SetsContext";

export default function MarketTile({ item }: { item: Set }) {
  const { updateSet, deleteSet } = useContext(SetsContext)
  return (
    <div
      className="relative w-full bg-cover bg-center rounded-xl shadow-xl p-2"
      style={{ backgroundImage: `url(${item.bg})` }}
    >
      <div className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,_white_40%,_transparent_60%)]" />
      <div className="relative z-10">
        <div className="absolute top-0 right-0 text-pulse-accent flex gap-2">
          {item.custom && (
            <AiOutlineDelete
              size={30}
              className="bg-white rounded-lg p-1"
              onClick={() => deleteSet(item.id)}
            />
          )}
          <IoCopyOutline
            size={30}
            className="bg-white rounded-lg p-1"
          />
          {item.liked
            ? (
              <FaHeart
                size={30}
                className="bg-white rounded-lg p-1"
                onClick={() => updateSet({ ...item, liked: false })}
              />
            ) : (
              <FaRegHeart
                size={30}
                className="bg-white rounded-lg p-1"
                onClick={() => updateSet({ ...item, liked: true })} />
            )}
        </div>
        <div className="font-bold text-pulse-accent">
          {item.name}
        </div>
        <div className="text-black/20 text-sm truncate w-1/2">
          Every {item.interval.min}s-{item.interval.max}s
        </div>
        <div className="text-black/20 text-sm truncate w-1/2">
          {item.randomize ? "Random" : "Ordered"} / {item.forceFullUseBeforeLoop ? "Full loop" : "Repeating"}
        </div>
        <div className="text-black/20 text-sm truncate w-1/2">
          {item.phrases.join(", ")}
        </div>
      </div>
    </div >
  );
};
