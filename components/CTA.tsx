import styles from "@/styles/style";
import Button from "./Button";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    fbq?: (event: string, action: string, params?: Record<string, any>) => void;
  }
}

const CTA: React.FC = () => {
  const handleCheckoutClick = () => {
    if (typeof window !== "undefined") {
      // Google Analytics 4 - direto com gtag()
      window.gtag?.("event", "begin_checkout", {
        currency: "BRL",
        value: 197.0,
        items: [
          {
            item_name: "Curso PMPR 2025",
            item_id: "curso-pmpr",
            price: 197.0,
            quantity: 1,
          },
        ],
      });

      // Facebook Pixel
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: 197.0,
          currency: "BRL",
        });
      }
    }
  };

  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-s-800 border-stone-700 border-2 bg-stone-700/50 rounded-[20px] relative items-center flex max-w-[700px] mx-auto shadow-lg`}
      id="price2"
    >

      {/* Rótulo 70% OFF */}
      <div className="absolute top-0 right-0 bg-red-600 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-md">
        70% OFF
      </div>

      <div className="flex-1 flex flex-col">
        {/* <p className={`${styles.paragraph} max-w-[470px] mt-5 font-semibold`}>
          PAGAMENTO FLEXÍVEL
        </p> */}
        <h2 className="font-poppins line-through xs:text-[35px] text-[30px] text-rose-500 xs:leading-[76.8px] leading-[66.8px] w-full">
          R$697,90
        </h2>
        <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-green-600 xs:leading-[76.8px] leading-[66.8px] w-full">
          R$197,00
        </h2>
        <p className={`mt-5 font-semibold text-white`}>
          Liberação imediata.
        </p>
        <ul className="text-left mt-4 space-y-2 text-white">
          <li className="flex items-start gap-2">
            ✅ <span>80 Aulas Completas</span>
          </li>
          <li className="flex items-start gap-2">
            ✅ <span>Exercícios de todas as disciplinas</span>
          </li>
          <li className="flex items-start gap-2">
            ✅ <span>Correções comentadas</span>
          </li>
          <li className="flex items-start gap-2">
            ✅ <span>Simulados</span>
          </li>
          <li className="flex items-start gap-2">
            ✅ <span>Provas do último concurso</span>
          </li>
        </ul>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <a href="/checkout" className="button z-10">
          <div className="dots_border"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="sparkle"
          >
            <path
              className="path"


              stroke="black"
              fill="black"
              d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
            ></path>
            <path
              className="path"


              stroke="black"
              fill="black"
              d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
            ></path>
            <path
              className="path"


              stroke="black"
              fill="black"
              d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
            ></path>
          </svg>
          <p className="text_button font-bold text-md">Compre Agora</p>
        </a>
      </div>

    </section>
  );
};

export default CTA;
