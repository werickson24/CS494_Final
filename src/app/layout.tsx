import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CollectionProvider } from '@/context/CollectionContext';
import Navigation from '@/components/Navigation';
import theme from './theme';

export const metadata: Metadata = {
  title: 'Amiibo Explorer',
  description: 'Browse and collect your favorite Amiibo figures, Oregon State University, William Erickson',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CollectionProvider>
            <Navigation />
            {children}
          </CollectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}