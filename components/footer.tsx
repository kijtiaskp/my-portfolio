export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="divider mb-8" />
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-apple-tertiary">
        <span>&copy; {new Date().getFullYear()} Kijtisak Pangmee</span>
        <span>Built with Next.js &middot; Deployed on GitHub Pages</span>
      </div>
    </footer>
  )
}
