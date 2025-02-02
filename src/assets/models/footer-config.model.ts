export interface FooterConfigModel {
  metaData: {
    fixed: boolean;
    transparent: boolean;
  };
  title: string;
  style: 'small' | 'large';
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
