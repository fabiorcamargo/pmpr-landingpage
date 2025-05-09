import styles from "@/styles/style";
import { discount, robot, imgpmpr, aline } from "@/public/assets";
import GetStarted from "./GetStarted";
import Image from "next/image";

const Hero: React.FC = () => (
  <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
    >


      <div className=" flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
        <Image src={discount} alt="discount" className="w-[32px] h-[32px]" />
        <p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">70%</span> de desconto{" "}
          <span className="text-white">com cupom</span> ALINE10
        </p>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
          Preparatório Concurso <br className="sm:block hidden" />{" "}
          <span className="text-gradient">PMPR 2025</span>{" "}
        </h1>
        <div className="ss:flex hidden md:mr-4 mr-0">
          <GetStarted />
        </div>
      </div>
      {/* <h1 className="w-full font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
        Payment Methond.
      </h1> */}
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Se você sonha em se tornar um policial militar no Paraná, este curso foi feito para você! Com 80 aulas completas, nosso preparatório cobre todo o conteúdo do edital do concurso para Soldado, garantindo que você tenha o melhor desempenho na prova.
      </p>
      <div className="text-center justify-center z-10 mx-auto sm:mx-0">
        <a
          href="https://www.instagram.com/aline_bertoldo" // substitua pela URL real da rede dela
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 flex items-center p-2 my-4 bg-discount-gradient border border-gray-700 rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          <div className="relative">
            <Image
              className="h-16 w-16 rounded-full object-cover"
              src={aline}
              width={64}
              height={64}
              alt="Avatar"
            />
            <div className="absolute inset-0 rounded-full shadow-inner"></div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="font-bold text-gray-200 text-lg">Aline Bertoldo</h2>
            <p className="text-gray-400">Influencer Digital</p>
          </div>
          <svg className="w-7 h-7 text-gray-200 mx-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7H7m10 0v10" />
          </svg>
        </a>
      </div>
    </div>
    <div className={`${styles.flexCenter} ss:hidden py-8 w-max-sm`}>
      <GetStarted />
    </div>
    <div className={`${styles.flexCenter} flex-1 flex md:my-0 my-10 relative`}>
      <Image
        src={imgpmpr}
        alt="billings"
        className="w-full h-auto max-w-full object-contain relative z-[5] rounded-2xl "
      />

      
    </div>

  </section>
);

export default Hero;
