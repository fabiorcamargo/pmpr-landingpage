import "@/styles/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Concurso PMPR 2025",
  description: "Faça parte do melhor preparatório para o Concurso da PMPR",
};

const GA_TRACKING_ID = "G-3FJHE8L3C1"; // Substitua pelo seu ID

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
