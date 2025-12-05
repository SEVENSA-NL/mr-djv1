export default function BruiloftDJLoading() {
  return (
    <div className="bg-white">
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-200 animate-pulse" />
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <div className="mb-6 h-4 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="grid gap-8 sm:grid-cols-3 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-6 space-y-4 animate-pulse">
              <div className="h-12 w-12 bg-slate-200 rounded" />
              <div className="h-6 w-32 bg-slate-200 rounded" />
              <div className="h-16 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
