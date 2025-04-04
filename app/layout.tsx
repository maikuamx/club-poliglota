import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://clubpoliglota.com'),
  title: {
    default: 'Club Políglota | Aprende idiomas con profesores nativos',
    template: '%s | Club Políglota'
  },
  description: 'Aprende inglés y francés con profesores nativos. Clases personalizadas, grupos reducidos y ambiente amigable.',
  keywords: ['clases de inglés', 'clases de francés', 'profesores nativos', 'aprender idiomas', 'cursos de idiomas', 'Chihuahua'],
  authors: [{ name: 'Club Políglota' }],
  creator: 'Club Políglota',
  publisher: 'Club Políglota',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://clubpoliglota.com',
    title: 'Club Políglota | Aprende idiomas con profesores nativos',
    description: 'Aprende inglés y francés con profesores nativos. Clases personalizadas, grupos reducidos y ambiente amigable.',
    siteName: 'Club Políglota',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Club Políglota - Aprende idiomas con profesores nativos'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club Políglota | Aprende idiomas con profesores nativos',
    description: 'Aprende inglés y francés con profesores nativos. Clases personalizadas, grupos reducidos y ambiente amigable.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#2D235F" />
        <meta name="msapplication-TileColor" content="#2D235F" />
        <meta name="theme-color" content="#2D235F" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}