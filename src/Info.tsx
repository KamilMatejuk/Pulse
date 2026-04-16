export default function Info({ text, fullWidth }: { text: string, fullWidth?: boolean }) {
  return (
    <div className={`
      ${fullWidth && 'w-full'}
      flex flex-col items-center justify-center text-center
      border border-black/5 text-black/40 bg-black/5
      rounded-lg p-2
    `}>
      {text}
    </div >
  );
}