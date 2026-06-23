import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Creative LAB by MJ Solution Indonesia',
    template: '%s | Creative LAB',
  },
  description:
    'Transform your business with integrated hardware and software solutions built for B2B and B2G leaders.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
