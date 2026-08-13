import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScroll } from '@/components/SmoothScroll';

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
});

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Sai Santosh Madhari | UX Designer & AI Builder',
  description: 'Portfolio of Sai Santosh Madhari, UX Designer with 3+ years of experience designing intuitive web and mobile experiences (TCS Ultimatix TX Team & Tech SW Service Next Gen).',
  keywords: ['Sai Santosh Madhari', 'UX Designer', 'TCS', 'Ultimatix', 'Heuristic Evaluation', 'Design Systems', 'WCAG', 'AI Design'],
  authors: [{ name: 'Sai Santosh Madhari' }],
  openGraph: {
    title: 'Sai Santosh Madhari | UX Designer & AI Builder',
    description: 'I design interactions that guide users, reduce confusion, and build trust.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}>
      <body className="antialiased bg-bg-offwhite text-primary selection:bg-primary selection:text-white min-h-screen flex flex-col">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
