import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kijtisak P. — Full Stack Developer",
  description:
    "Full Stack Developer with 5+ years of experience building modern web applications with React, Vue.js, Go, and .NET.",
  authors: [{ name: "Kijtisak Pangmee" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-apple-bg text-apple-text font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
