import './globals.css';

export const metadata = {
  title: 'Serdar Elektronik - Profesyonel Teknik Servis | Trabzon Arsin',
  description: 'Trabzon Arsin\'de TV tamiri, uydu sistemleri, çanak anten montajı ve elektronik cihaz onarımı. Garantili ve hızlı teknik servis hizmeti.',
  keywords: 'elektronik servis, tv tamiri, çanak anten, uydu sistemi, trabzon, arsin, teknik servis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
