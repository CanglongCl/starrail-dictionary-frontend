import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Honkai: Star Rail Dictionary',
  description: 'Search word for Honkai: Star Rail in all languages. ',
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
