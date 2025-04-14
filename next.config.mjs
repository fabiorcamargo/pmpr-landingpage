import autoCert from "anchor-pki/auto-cert/integrations/next";

// If using .ts instead of .mjs, you can use the following comment to suppress the error
// @ts-expect-error - No type definitions available for anchor-pki
const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {
  // Configurações de desenvolvimento do Next.js
  devIndicators: {
    autoPrerender: false,
  },
  // Porta padrão já é 3000, não precisa configurar explicitamente a menos que seja necessário
  // O auto-cert proxy deve já estar tratando da parte do HTTPS
};

export default withAutoCert(nextConfig);
