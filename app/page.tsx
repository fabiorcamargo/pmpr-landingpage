"use client"
import styles from "@/styles/style";
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Cartao, Footer } from "@/components"
const Home: React.FC = () => {
  return (
    <>
      <div className="bg-black w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <div className={`bg-black ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            {/* <Business /> */}
            <Billing />
            <CardDeal />
            <Testimonials />
            {/* <Clients /> */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
              <CTA />
              <Cartao />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home