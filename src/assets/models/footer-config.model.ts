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
  form: {
    title: string;
    mailPlaceholder: string;
    messagePlaceholder: string;
    buttonPlaceholder: string;
  };
}
