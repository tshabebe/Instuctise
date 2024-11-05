export default function BounceLoader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="size-2 animate-bounce rounded-full bg-pink [animation-delay:-0.3s]"></div>
      <div className="size-2 animate-bounce rounded-full bg-pink [animation-delay:-0.13s]"></div>
      <div className="size-2 animate-bounce rounded-full bg-pink"></div>
    </div>
  );
}
