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
      // Google Tag Manager
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "checkout",
        ecommerce: {
          currency: "BRL",
          value: 227.9, // Valor do produto
          items: [
            {
              item_name: "Curso PMPR 2025",
              item_id: "curso-pmpr",
              price: 227.9,
              quantity: 1,
            },
          ],
        },
      });

      // Facebook Pixel
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: 227.9,
          currency: "BRL",
        });
      }
    }
  };

  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-discount-gradient rounded-[20px] box-shadow relative flex flex-col items-center max-w-[700px]`}
    >
      {/* Rótulo 70% OFF */}
      <div className="absolute top-0 right-0 bg-red-600 text-white font-bold text-sm px-4 py-2 rounded-bl-lg shadow-md">
        70% OFF
      </div>

      <div className="flex-1 flex flex-col">
        <p className={`${styles.paragraph} max-w-[470px] mt-5 font-semibold`}>
          CARTÃO DE CRÉDITO
        </p>
        <h2 className="font-poppins line-through xs:text-[35px] text-[30px] text-rose-500 xs:leading-[76.8px] leading-[66.8px] w-full">
          R$697,90
        </h2>
        <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-gradient xs:leading-[76.8px] leading-[66.8px] w-full">
          R$227,90
        </h2>
        <p className={`mt-5 font-semibold text-white`}>
          Pagamento no Cartão em até 4x, liberação imediata.
        </p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <a
          href="https://www.asaas.com/c/i92q8e60m0uf0zaq"
          target="_blank"
          rel="noopener"
          className="py-4 px-6 bg-pmpr-gradient font-poppins font-medium text-[18px] text-black font-semibold outline-none rounded-[10px] hover:translate-x-2 transition-all ease-linear cursor-pointer"
          onClick={handleCheckoutClick}
        >
          Comprar Agora
        </a>
      </div>

     
    </section>
  );
};

export default CTA;
