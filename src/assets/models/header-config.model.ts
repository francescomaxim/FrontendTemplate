export interface HeaderConfigModel {
  metaData: {
    fixed: boolean;
    transparent: boolean;
  };
  company: {
    name: {
      show: boolean;
      title: string;
    };
    logo: {
      show: boolean;
      url: string;
      alt: string;
    };
  };
  menu: {
    link: string;
    links: string[];
  }[];
  auth: boolean;
}
