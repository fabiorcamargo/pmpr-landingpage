import "@/styles/globals.css";
import Script from "next/script";
import Head from "next/head";

const GA_TRACKING_ID = "G-3FJHE8L3C1"; // Google Analytics
const GTM_ID = "GTM-MQN2N2G4"; // Google Tag Manager
const FB_PIXEL_ID = "1205826360896620"; // Facebook Pixel

export const metadata = {
  title: "Concurso PMPR 2025",
  description: "Faça parte do melhor preparatório para o Concurso da PMPR",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <head>
        <title>Concurso PMPR 2025</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1c1917" />
        <meta name="description" content="Faça parte do melhor preparatório para o Concurso da PMPR" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Concurso PMPR 2025" />
        <meta property="og:description" content="Faça parte do melhor preparatório para o Concurso da PMPR" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pmpr.profissionalizaead.com.br/assets/imgpmpr.webp" />
        <meta property="og:url" content="https://pmpr.profissionalizaead.com.br" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Concurso PMPR 2025" />
        <meta name="twitter:description" content="Faça parte do melhor preparatório para o Concurso da PMPR" />
        <meta name="twitter:image" content="https://pmpr.profissionalizaead.com.br/assets/imgpmpr.webp" />

        {/* Canonical */}
        <link rel="canonical" href="https://pmpr.profissionalizaead.com.br" />

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17024321136"></Script> */}
        {/* <Script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17024321136');
          `}
        </Script> */}


        {/* Google Analytics */}
        {/* <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        /> */}
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

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=true;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView'); // Adicione esta linha para rastrear o PageView
          `}
        </Script>

        {/* Dados estruturados JSON-LD */}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Concurso PMPR 2025",
            url: "https://pmpr.profissionalizaead.com.br",
            logo: "https://pmpr.profissionalizaead.com.br/assets/Logo-White.svg",
            sameAs: [
              "https://facebook.com/profissionalizaead",
              "https://instagram.com/profissionalizaead",
            ],
          })}
        </Script>
      </head>

      <body>
        {/* Google Tag Manager noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
