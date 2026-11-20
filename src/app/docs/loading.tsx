export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 animate-pulse">
      <div className="h-10 w-2/3 bg-[#1a1a1a] mb-4" />
      <div className="h-5 w-1/2 bg-[#111111] mb-10" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-[#111111]" />
        <div className="h-4 w-full bg-[#111111]" />
        <div className="h-4 w-5/6 bg-[#111111]" />
        <div className="h-4 w-full bg-[#111111]" />
        <div className="h-4 w-3/4 bg-[#111111]" />
      </div>
    </div>
  );
}
