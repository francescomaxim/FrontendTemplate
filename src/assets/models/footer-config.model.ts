export interface FooterConfigModel {
  title: string;
  style: string;
  about: {
    title: string;
    description: string;
    phone: string;
    email: string;
  };
  links: {
    title: string;
    links: string[];
  };
}
