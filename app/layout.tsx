import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UI Optimization Experiment',
  description: 'Balancing Technology and Human Cognitive Load',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

