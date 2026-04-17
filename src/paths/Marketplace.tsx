import { FaCheck } from "react-icons/fa6";
import MarketTile from "../MarketTile";
import Info from "../Info";
import { useContext } from "react";
import { SetsContext } from "../contexts/SetsContext";

export default function Marketplace() {
  const { sets } = useContext(SetsContext);

  return (
    <div className="min-h-screen bg-pulse-bg flex flex-col items-center gap-4 p-4 relative font-sans">
      {/* Home */}
      <a href='' className="absolute top-4 right-4 text-pulse-accent border border-2 rounded-lg p-2 hover:scale-[1.02] transition-all">
        <FaCheck size={35} />
      </a>
      {/* Title */}
      <h1 className="w-full h-14 text-2xl flex justify-center items-center text-pulse-accent font-extrabold">
        Sets
      </h1>
      {/* info */}
      <Info text="You can select existing sets, copy and edit them, or create completely your own." fullWidth />
      {/* Tiles list */}
      <h1 className="w-full text-md text-pulse-accent border-b border-pulse-accent/50">
        Your Sets
      </h1>
      <a
        href={`/options?operation=create`}
        className="w-full flex flex-col items-center justify-center border border-pulse-accent text-pulse-accent rounded-lg py-2"
      >
        Create new set
      </a>
      {sets.filter(s => s.custom).map((item, index) => (
        <MarketTile item={item} key={index} />
      ))}
      <h1 className="w-full text-md text-pulse-accent border-b border-pulse-accent/50">
        Marketplace
      </h1>
      {sets.filter(s => !s.custom).map((item, index) => (
        <MarketTile item={item} key={index} />
      ))}
    </div>
  );
};
