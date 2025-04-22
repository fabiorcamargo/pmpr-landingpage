"use client"
import styles from "@/styles/style";
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Cartao, Footer } from "@/components"
import AnalyticsDebugger from "@components/AnalyticsDebugger";
import SendClientIdToN8n from "@components/SendClientIdToN8n";
import { AnimatedTestimonials } from "@components/Testimonials2";
import testimonialsData from '@public/assets/testimonial.json'; // Importando o arquivo JSON
import React, { useEffect, useState } from "react";

 useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag('event', 'ads_conversion_Visualiza_o_de_p_gina_C_1');
    }
  });

const Home: React.FC = () => {
  return (
    <>
      <div className="relative bg-stone-900 w-full overflow-hidden">
        {/* Gradientes decorativos */}
        
        <div className="absolute bottom-40 right-0 w-[40%] h-[40%] pmpr__gradient z-0" />
        <div className="absolute top-0 right-20 w-[30%] h-[30%] blue__gradient z-0" />

        {/* Conteúdo principal */}
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth} relative z-10`}>
            <Hero />
            <Billing />
            <CardDeal />
            <AnimatedTestimonials autoplay testimonials={testimonialsData} />
            <Testimonials />
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home