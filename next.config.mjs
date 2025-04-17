import autoCert from "anchor-pki/auto-cert/integrations/next";

// Só ativa autoCert em desenvolvimento
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
};

const config = isDev ? autoCert({ enabledEnv: "development" })(nextConfig) : nextConfig;

export default config;
