export default function SkeletonCard() {
  return (
    <div className="border border-neutral-200/70 dark:border-neutral-800 rounded-xl p-4 bg-white/50 dark:bg-neutral-900/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="flex-1">
          <div className="h-3 w-40 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2" />
          <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2" />
      <div className="h-3 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
    </div>
  )
}
