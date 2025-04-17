import { feedback } from "@/constants";
import styles from "@/styles/style";
import FeedbackCard from "./FeedbackCard";
import CTA from "./CTA";

const Testimonials: React.FC = () => (
  <section
    id="price"
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
  >

      
<div className="bg-stone-900/70 border-stone-600 border-2 px-6 py-5 rounded-lg shadow-lg flex flex-col items-center md:max-w-4xl">
      
    <a href="/checkout" className="w-full flex flex-col items-center text-center relative z-[1]">
      {/* Card com título, cupom e texto explicativo */}

        <div className="flex items-center gap-4">
          <h1 className={`${styles.heading2} text-white`}>LOTE 1 CUPOM</h1>
          <span
            id="cpnCode"
            className="border-dashed border text-white px-4 py-2 rounded bg-indigo-600 xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px]"
          >
            ALINE10
          </span>
        </div>

        {/* Texto Explicativo dentro do Card */}
        <p className={`${styles.paragraph} text-center mt-4 text-white`}>
          Você tem o pagamento facilitado via PIX/BOLETO ou CARTÃO PARCELADO com 70% de desconto. Escolha a melhor opção 
          de pagamento e adquira ainda hoje antes que esse lote esgote!
        </p>
      
    </a>
    <CTA />

    </div>

    {/* Seção de feedbacks comentada */}
    {/* <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div> */}


    
  </section>
);

export default Testimonials;
