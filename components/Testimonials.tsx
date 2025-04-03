import { feedback } from "@/constants";
import styles from "@/styles/style";
import FeedbackCard from "./FeedbackCard";

const Testimonials: React.FC = () => (
  <section
    id="clients"
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
  >

    <div className="w-full flex flex-col items-center text-center relative z-[1]">
      {/* Card com título, cupom e texto explicativo */}
      <div className="bg-zinc-800/20 px-6 py-5 rounded-lg shadow-lg flex flex-col items-center max-w-[500px]">

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
          Você tem o pagamento facilitado e com 70% de desconto. Escolha a melhor opção 
          de pagamento e adquira ainda hoje antes que esse lote esgote!
        </p>
      </div>
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
