export interface FeatredCardProps {
    icon: string;
    title: string;
    content: string;
    index: number;
  }
  
  export interface ButtonProps {
    styles?: string;
  }
  
  export interface FeedBackProps {
    content: string;
    title: string;
    name: string;
    img: string | any;
  }
  
  export {}; // necessário para tipos globais
  
  declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
    //   fbq?: (...args: any[]) => void;
    }
  }
  