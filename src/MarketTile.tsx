import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { formatInterval, type Set } from "./storage";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { useContext } from "react";
import { SetsContext } from "./contexts/SetsContext";
import { SelectedContext } from "./contexts/SelectedContext";
import { twMerge } from "tailwind-merge";
import { FaRegEdit } from "react-icons/fa";

export default function MarketTile({ item }: { item: Set }) {
  const { updateSet, deleteSet } = useContext(SetsContext)
  const { selected, setSelected } = useContext(SelectedContext)
  return (
    <div
      className={twMerge(
        "relative w-full bg-cover bg-center rounded-xl shadow-xl p-2",
        selected?.id == item.id && "border-3 border-pulse-accent"
      )}
      style={{ backgroundImage: `url(${item.bg})` }}
      onClick={() => setSelected(selected?.id == item.id ? undefined : item)}
    >
      <div className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,_white_40%,_transparent_85%)]" />
      <div className="relative z-10">
        <div className="absolute top-0 right-0 text-pulse-accent flex gap-2">
          {item.custom && (
            <>
              <AiOutlineDelete
                size={30}
                className="bg-white rounded-lg p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selected?.id == item.id) setSelected(undefined);
                  deleteSet(item.id);
                }}
              />
              <a href={`/options?operation=edit&id=${item.id}`}>
                <FaRegEdit
                  size={30}
                  onClick={e => e.stopPropagation()}
                  className="bg-white rounded-lg p-1"
                />
              </a>
            </>
          )}
          <a href={`/options?operation=copy&id=${item.id}`}>
            <IoCopyOutline
              size={30}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-lg p-1"
            />
          </a>
          {item.liked
            ? (
              <FaHeart
                size={30}
                className="bg-white rounded-lg p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  updateSet({ ...item, liked: false });
                }}
              />
            ) : (
              <FaRegHeart
                size={30}
                className="bg-white rounded-lg p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  updateSet({ ...item, liked: true });
                }} />
            )}
        </div>
        <div className="font-bold text-pulse-accent">
          {item.name}
        </div>
        <div className="text-black/20 text-sm truncate w-1/2">
          {formatInterval(item.interval.min, item.interval.max)}
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
