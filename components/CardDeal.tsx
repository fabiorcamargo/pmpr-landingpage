import { card } from "@/public/assets";
import styles, { layout } from "@/styles/style";
import Button from "./Button";
import Image from "next/image";
const CardDeal: React.FC = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Acompanhe um exercío
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Todas as aulas possuem exercícios com base nos últimos concursos.
      </p>
    </div>
    <div className="relative w-full mt-6" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src="https://www.loom.com/embed/acd4319f3e1e4c898fe42101a5a05b0e?sid=763643bf-5f73-43e0-b1fc-c752c83b66cb"
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
  </section>
);

export default CardDeal;
