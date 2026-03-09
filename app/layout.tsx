import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kijtisak P. | Full Stack Developer",
  description:
    "Full Stack Developer with 5+ years of experience building modern web applications.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
