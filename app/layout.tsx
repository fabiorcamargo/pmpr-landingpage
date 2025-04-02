import "@/styles/globals.css";
export const metadata = {
  title: "Concurso PMPR 2025",
  description: "Faça parte do melhor preparatório para o Concurso da PMPR",
};

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
