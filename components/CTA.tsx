import styles from "@/styles/style";
import Button from "./Button";
const CTA: React.FC = () => (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
        <div className="flex-1 flex flex-col">
            <h2 className="font-poppins line-through font-semibold xs:text-[48px] text-[40px] text-gray-600 xs:leading-[76.8px] leading-[66.8px] w-full">
                R$697,90
            </h2>
            <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-gray-400 xs:leading-[76.8px] leading-[66.8px] w-full">
                R$197,00
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                Pagamento facilitado via PIX ou BOLETO.
            </p>
        </div>
        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <a
                href="https://www.asaas.com/c/i92q8e60m0uf0zaq"
                target="_blank"
                rel="noopener"
                className="py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[10px] hover:translate-x-2  transition-all ease-linear cursor-pointer"
            >
                Comprar Agora
            </a>
        </div>
    </section>

)

export default CTA;