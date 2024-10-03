import '@/src/styles/globals.css'
import '@/src/styles/theme.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eco-Track',
  description: 'Combining economic value with social impact through environmental cleanup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}