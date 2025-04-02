import { apple, bill, google, ead1, ead2 } from "@/public/assets";
import styles, { layout } from "@/styles/style";
import Image from "next/image";

const Billing: React.FC = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <Image
        src={ead1}
        alt="plataforma"
        className="w-[100%] h-[100%] relative z-[5]"
      />
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient" />
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Acompanhe uma das aulas.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        📢"Esse conteúdo sempre cai na prova da PM-PR! Você sabe responder?"
      </p>

      {/* Embed do vídeo */}
      <div className="relative w-full mt-6" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src="https://www.loom.com/embed/acd4319f3e1e4c898fe42101a5a05b0e?sid=763643bf-5f73-43e0-b1fc-c752c83b66cb"
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>

      {/* <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <Image
          src={apple}
          alt="apple_store"
          className="w-[128px] h-[42px] object-contain mr-5 cursor-pointer"
        />
        <Image
          src={google}
          alt="google_play"
          className="w-[128px] h-[42px] object-contain cursor-pointer"
        />
      </div> */}
    </div>
  </section>
);

export default Billing;
