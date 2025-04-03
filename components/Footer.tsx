import styles from "@/styles/style";
import { logo } from "@/public/assets";
import { socialMedia } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col text-center`}>
    <div className="flex flex-col items-center mb-8 w-full">
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          alt="Profissionaliza EAD"
          className="w-[266px] h-[72px] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[310px]`}>
          Preparando os policiais do futuro.
        </p>
      </div>
    </div>

    <div className="w-full flex flex-col items-center pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-[18px] leading-[27px] text-white">
        Profissionaliza EAD. Todos os direitos reservados.
      </p>
      <div className="flex flex-row mt-6">
        {socialMedia.map((social, index) => (
          <Link 
            key={social.id} 
            href={social.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mr-6 last:mr-0"
          >
            <Image
              src={social.icon}
              alt={social.id}
              className="w-[21px] h-[21px] object-contain cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
