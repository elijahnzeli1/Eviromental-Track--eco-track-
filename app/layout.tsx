import '@/src/styles/globals.css'
import '@/src/styles/theme.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from './Providers'
import Navbar from '@/components/Navbar'
import AISidebar from '@/components/AISidebar'
import ConditionalFooter from '@/src/components/ConditionalFooter'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

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
      <body className={`${inter.className} bg-green-50 min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          
          <Toaster />
          <AISidebar />

          <ConditionalFooter />
        </Providers>
        {/* <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider> */}
      </body>
    </html>
  )
}