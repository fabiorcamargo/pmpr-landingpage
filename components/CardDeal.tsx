import { card } from "@/public/assets";
import styles, { layout } from "@/styles/style";
import Button from "./Button";
import Image from "next/image";
import GetStarted2 from "./GetStarted2";
const CardDeal: React.FC = () => (
  <section className={`${layout.section}`}>
    
    <div className={layout.sectionInfo}>
    <div className={`${styles.flexCenter} py-8 w-max-sm mx-auto sm:mx-0`}>
      <GetStarted2 />
    </div>
      <h2 className={styles.heading2}>
        Acompanhe um exercício.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px]`}>
        📢"As questões são no modelo de banca e baseada nos concursos."
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

export default CardDeal;
