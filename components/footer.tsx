export default function Footer() {
  return (
    <footer className="relative py-10 px-6">
      <div className="divider mb-10" />
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-apple-text/80 font-mono">&lt;kijtiaskp/&gt;</span>
          <span className="text-xs text-apple-tertiary/40">
            &copy; {new Date().getFullYear()} Kijtisak Pangmee
          </span>
        </div>
        <span className="text-xs text-apple-tertiary/30">
          Built with Next.js &middot; Deployed on GitHub Pages
        </span>
      </div>
    </footer>
  )
}
