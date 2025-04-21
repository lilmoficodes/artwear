import './globals.css';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import LenisProvider from '@/components/LenisProvider';
import Script from 'next/script';
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Artwear - Home',
}
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="en">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <body className="font-neue">
          <LenisProvider>

            <SessionProviderWrapper>
              {children}
            </SessionProviderWrapper>
          </LenisProvider>
      </body>
    </html>
  )
}
