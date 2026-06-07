import type { Metadata } from 'next'
import '../globals.css'
import CursorPet from '@/components/CursorPet'
import PersonalAssistant from '@/components/PersonalAssistant'

export const metadata: Metadata = {
  title: {
    default: 'Hemanth Kumar S - Student Developer & Portfolio',
    template: '%s | Hemanth Kumar S',
  },
  description:
    'Portfolio of Hemanth Kumar S, a student developer building web and mobile applications with Next.js, React, Android, Kotlin, and modern UI design.',
  keywords: [
    'Hemanth Kumar S',
    'Hemanth Kumar portfolio',
    'student developer',
    'web developer',
    'mobile developer',
    'Next.js',
    'React',
    'Kotlin',
    'Android',
    'Tailwind CSS',
    'Framer Motion',
  ],
  openGraph: {
    title: 'Hemanth Kumar S - Student Developer & Portfolio',
    description:
      'Portfolio of Hemanth Kumar S, showcasing web and mobile app development, Android projects, React/Next.js work, and technical skills.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemanth Kumar S - Student Developer & Portfolio',
    description:
      'Portfolio of Hemanth Kumar S, showcasing web and mobile app development, Android projects, React/Next.js work, and technical skills.',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90" fill="%2300F7FF">H</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="bg-dark text-white">
        {children}
        <CursorPet />
        <PersonalAssistant />
      </body>
    </html>
  )
}
