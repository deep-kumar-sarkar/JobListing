export default function Section({ title, children, actions }) {
  return (
    <section className="bg-white/80 dark:bg-neutral-900/70 backdrop-blur rounded-xl shadow-soft border border-neutral-200/60 dark:border-neutral-800 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-xl font-semibold">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  )
}
