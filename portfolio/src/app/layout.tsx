import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Hemanth Kumar S - Student Developer',
  description: 'Portfolio of Hemanth Kumar S, showcasing web and mobile development, AI projects, and professional experience.',
  keywords: ['portfolio', 'Hemanth Kumar', 'web developer', 'mobile developer', 'AI', 'Next.js', 'Kotlin', 'React'],
  openGraph: {
    title: 'Hemanth Kumar S - Student Developer',
    description: 'Portfolio of Hemanth Kumar S, showcasing web and mobile development, AI projects, and professional experience.',
    type: 'website',
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
      </body>
    </html>
  )
}
