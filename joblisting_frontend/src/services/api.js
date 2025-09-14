export const api = {
  all: async () => fetch('/api/Alljobs').then(r => r.json()),
  byProfile: async (profile) => fetch(`/api/jobs?profile=${encodeURIComponent(profile)}`).then(r => r.json()),
  byText: async (text) => fetch(`/api/jobs/${encodeURIComponent(text)}`).then(r => r.json()),
  create: async (job) => fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  }).then(async r => {
    if (!r.ok) throw new Error(await r.text())
    return r.json().catch(() => null)
  })
}

export default api
