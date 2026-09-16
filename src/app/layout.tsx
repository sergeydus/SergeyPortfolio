import type { Metadata } from 'next'
import { profile } from '@/content/portfolio'
import { SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sergeydus.github.io'),
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    siteName: `${profile.name} Portfolio`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#030712] text-slate-100 antialiased">{children}</body>
    </html>
  )
}
