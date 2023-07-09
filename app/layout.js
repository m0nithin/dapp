import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import SibeBar from '@/components/SibeBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Token | Dashboard',
  description: 'Token Dashboard',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <div className='h-screen w-screen flex flex-col'>
            <NavBar />
            <div className='flex h-full'>
              <SibeBar />
              <main>
                {children}
                <Footer />
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}