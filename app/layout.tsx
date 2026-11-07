import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Shivashankar B N | GitHub Dashboard',
  description:
    'Premium dark GitHub profile dashboard for Shivashankar B N, featuring real public repository data and stats.',
  keywords: ['GitHub', 'profile', 'developer dashboard', 'Shivashankar B N', 'Next.js'],
  openGraph: {
    title: 'Shivashankar B N | GitHub Dashboard',
    description: 'Aspiring Associate Product Manager | AI & Data Science Enthusiast',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-bg text-white antialiased`}>{children}</body>
    </html>
  );
}
