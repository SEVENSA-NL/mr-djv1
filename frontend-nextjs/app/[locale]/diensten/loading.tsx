export default function DienstenLoading() {
  return (
    <div className="bg-white">
      {/* Hero Skeleton */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-200 animate-pulse" />

      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 h-4 w-64 bg-slate-200 rounded animate-pulse" />

        {/* Title Skeleton */}
        <div className="mb-12 text-center space-y-4">
          <div className="h-3 w-32 bg-slate-200 rounded mx-auto animate-pulse" />
          <div className="h-12 w-96 bg-slate-200 rounded mx-auto animate-pulse" />
          <div className="h-6 w-full max-w-2xl bg-slate-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 animate-pulse">
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
