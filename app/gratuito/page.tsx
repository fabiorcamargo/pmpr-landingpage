"use client"
import styles from "@/styles/style";
import { Navbar, Hero, Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA, Cartao, Footer } from "@/components"
import AnalyticsDebugger from "@components/AnalyticsDebugger";
import SendClientIdToN8n from "@components/SendClientIdToN8n";
import FormGratis from "@components/FormGratis";
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
            <FormGratis/>
            <Footer />
            <AnalyticsDebugger/>
            {/* <SendClientIdToN8n/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home