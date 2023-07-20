import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers';

import App from './App';


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
          <App>
            {children}
          </App>
        </Providers>
      </body>
    </html>
  )
}
