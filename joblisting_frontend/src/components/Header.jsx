export default function Header({ tab, setTab }) {
  const headerButton = (id, label) => (
    <button
      className={`px-3.5 py-2 rounded-full text-sm font-medium transition border shadow-soft ${tab === id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/70 dark:bg-neutral-900/60 text-blue-700 dark:text-blue-300 border-blue-200/70 dark:border-blue-900/40 hover:bg-blue-50/80 dark:hover:bg-blue-900/20'}`}
      onClick={() => setTab(id)}
    >
      {label}
    </button>
  )

  return (
    <header className="pt-2 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Job Listing</span>
        </h1>
        <a className="hidden sm:inline-flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 hover:underline" href="#" onClick={(e)=>e.preventDefault()}>
          v1.0
        </a>
      </div>
      <div className="flex gap-2 flex-wrap">
        {headerButton('all', 'All Jobs')}
        {headerButton('profile', 'Search by Profile')}
        {headerButton('text', 'Search by Text')}
        {headerButton('create', 'Post a Job')}
      </div>
    </header>
  )
}
