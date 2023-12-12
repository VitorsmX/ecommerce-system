import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loja Virtual Fetiche',
  description: 'Produtos Eróticos e Cosméticos Íntimos Sob Demanda',
  openGraph: {
    title: 'Loja Virtual Fetiche - Compre Aqui',
    description: 'Conheça o próximo nível em Produtos Eróticos',
    url: 'https://ecommerce-system-ejno.vercel.app/',
    siteName: 'Loja Vitual Fetiche',
    images: [
      {
        url: 'https://res.cloudinary.com/dxljzxgam/image/upload/v1702321608/pd3bg2mvzqvgfs38wpoy.png',
        width: 800,
        height: 600,
        alt: 'Home Page',
      },
      {
        url: 'https://res.cloudinary.com/dxljzxgam/image/upload/v1702321608/pd3bg2mvzqvgfs38wpoy.png',
        width: 1800,
        height: 1600,
        alt: 'Home Page',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className='bg-gradient-to-b bg-neutral-300 bg-no-repeat'>
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
