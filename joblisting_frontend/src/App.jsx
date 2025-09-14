import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Section from './components/Section.jsx'
import JobCard from './components/JobCard.jsx'
import SkeletonCard from './components/SkeletonCard.jsx'
import Header from './components/Header.jsx'
import { api } from './services/api.js'





function App() {
  const [tab, setTab] = useState('all')

  // shared state
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // search states
  const [profile, setProfile] = useState('')
  const [text, setText] = useState('')

  // create job state
  const [form, setForm] = useState({ desc: '', profile: '', exp: 0, techs: [] })
  // Keep a raw input buffer for techs so users can type commas and continue typing
  const [techsInput, setTechsInput] = useState('')

  const run = async (fn) => {
    try {
      setLoading(true)
      setError('')
      const data = await fn()
      setJobs(Array.isArray(data) ? data : (data ? [data] : []))
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    run(api.all)
  }, [])


  return (
    <div className="min-h-screen w-full text-left">
      <div className="container">
        <Header tab={tab} setTab={setTab} />

        {tab === 'all' && (
          <Section title="All Jobs" actions={
            <button className="px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700" onClick={() => run(api.all)}>Refresh</button>
          }>
            {loading && (
              <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && (
              <div className="grid md:grid-cols-2 gap-4">
                {jobs.map((j, idx) => <JobCard key={idx} job={j} />)}
                {!error && jobs.length === 0 && (
                  <div className="col-span-full text-sm text-neutral-500">
                    No jobs found.
                  </div>
                )}
              </div>
            )}
          </Section>
        )}

        {tab === 'profile' && (
          <Section title="Search by Profile">
            <form
              onSubmit={(e) => { e.preventDefault(); run(() => api.byProfile(profile)); }}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <input value={profile} onChange={(e) => setProfile(e.target.value)} placeholder="e.g. Java Developer" className="flex-1 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60" />
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white shadow-soft">Search</button>
            </form>
            {loading && (
              <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && (
              <div className="grid md:grid-cols-2 gap-4">
                {jobs.map((j, idx) => <JobCard key={idx} job={j} />)}
                {!error && jobs.length === 0 && <p className="text-neutral-500 text-sm">No jobs found.</p>}
              </div>
            )}
          </Section>
        )}

        {tab === 'text' && (
          <Section title="Search by Text">
            <form
              onSubmit={(e) => { e.preventDefault(); run(() => api.byText(text)); }}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="any text..." className="flex-1 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60" />
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white shadow-soft">Search</button>
            </form>
            {loading && (
              <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && (
              <div className="grid md:grid-cols-2 gap-4">
                {jobs.map((j, idx) => <JobCard key={idx} job={j} />)}
                {!error && jobs.length === 0 && <p className="text-neutral-500 text-sm">No jobs found.</p>}
              </div>
            )}
          </Section>
        )}

        {tab === 'create' && (
          <Section title="Post a Job">
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const payload = { ...form, exp: Number(form.exp) || 0, techs: (techsInput || '').split(',').map(s => s.trim()).filter(Boolean) }
                await run(() => api.create(payload).then(() => api.all()))
                // reset form and input buffer after successful create
                setForm({ desc: '', profile: '', exp: 0, techs: [] })
                setTechsInput('')
                setTab('all')
              }}
              className="grid gap-3 max-w-2xl"
            >
              <div className="grid gap-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-300">Profile</label>
                <input value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60" required />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-300">Description</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60" rows={4} required />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-300">Experience (years)</label>
                <input type="number" min="0" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-neutral-600 dark:text-neutral-300">Techs (comma separated)</label>
                <input value={techsInput} onChange={(e) => setTechsInput(e.target.value)} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60" placeholder="Java, Spring, SQL" />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white shadow-soft">Create</button>
                <button type="button" onClick={() => { setForm({ desc: '', profile: '', exp: 0, techs: [] }); setTechsInput(''); }} className="px-4 py-2 rounded-md border">Clear</button>
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </Section>
        )}

        <footer className="mt-10 text-center text-sm text-neutral-500">
          Backend expected at http://localhost:8080. If CORS blocks requests, Vite dev server proxy is configured at /api.
        </footer>
      </div>
    </div>
  )
}

export default App
