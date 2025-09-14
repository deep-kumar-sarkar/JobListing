import { useState } from 'react'

export default function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false)
  const desc = String(job.desc || '')
  const isLong = desc.length > 140
  const clampStyle = { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }

  return (
    <div className="group border border-neutral-200/70 dark:border-neutral-800 rounded-xl p-4 flex flex-col gap-3 transition duration-200 bg-white/60 dark:bg-neutral-900/60 hover:border-blue-300/70 dark:hover:border-blue-900/40 shadow-soft shadow-hover">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center font-semibold">
            {String(job.profile || '?').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-base font-semibold leading-tight">{job.profile}</div>
            <div className="text-xs text-neutral-500">{job.exp} yrs experience</div>
          </div>
        </div>
      </div>

      {desc && (
        <div className="mt-1">
          <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 ring-1 ring-inset ring-neutral-200/70 dark:ring-neutral-700/70">
            Description
          </span>
          <div className="mt-2 p-3 rounded-lg bg-white/70 dark:bg-neutral-900/50 ring-1 ring-inset ring-neutral-200/70 dark:ring-neutral-800/70">
            <p className="text-sm text-neutral-700 dark:text-neutral-300" style={!expanded ? clampStyle : undefined}>{desc}</p>
            {isLong && (
              <button
                type="button"
                className="mt-2 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                onClick={() => setExpanded(v => !v)}
              >
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      )}

      {Array.isArray(job.techs) && job.techs.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {job.techs.map((t, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800/60">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
