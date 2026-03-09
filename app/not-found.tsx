import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-gradient-hero">404</h1>
      <p className="mt-4 text-apple-secondary">This page does not exist.</p>
      <Link
        href="/"
        className="mt-8 px-6 py-2.5 text-sm border border-white/[0.15] rounded-full text-apple-text hover:bg-white/[0.06] transition-all duration-300"
      >
        Return home
      </Link>
    </main>
  )
}
